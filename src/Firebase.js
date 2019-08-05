/* @flow */
/* eslint-disable react/display-name */
import * as React from 'react';
import firebase from 'react-native-firebase';

type StringMap = {
  [string]: string,
};

class Firebase {
  auth: typeof firebase.auth;
  database: typeof firebase.database;
  storage: typeof firebase.storage;
  errors: Array<string>;

  constructor() {
    this.auth = firebase.auth;
    this.database = firebase.database;
    this.storage = firebase.storage;
  }

  errors = [
    'check-your-internet-connection',
    'auth/email-already-in-use',
    'auth/user-disabled',
    'auth/user-not-found',
    'auth/wrong-password',
    'auth/email-already-in-use',
    'auth/invalid-email',
    'auth/weak-password',
    'username-already-exists',
    'an-error-occured-please-try-again-later',
    'auth/requires-recent-login',
    'auth/user-mismatch',
    'auth/user-not-found',
    'auth/invalid-credential',
  ];

  getErrorMessage = (code: string) =>
    this.errors.includes(code) ? code : 'check-your-internet-connection';

  signIn = ({ email, password }: StringMap) =>
    new Promise<void>((resovle: Function, reject: Function) => {
      this.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => resovle())
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  createUser = ({ email, password, username, language }: StringMap) =>
    new Promise<void>((resolve, reject) => {
      this.isUsernameDuplicated(username)
        .then(() => {
          this.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
              if (user && user.uid) {
                let updates = {};
                updates['users/private/' + user.uid] = {
                  uid: user.uid,
                  email: email,
                  language: language,
                  username: username,
                  points: 0,
                  lastPlayed: 'never-played',
                  createdAt: new Date(),
                };
                updates['users/public/' + user.uid] = {
                  username: username,
                  points: 0,
                  lastPlayed: 'never-played',
                };
                this.database()
                  // $FlowFixMe
                  .ref()
                  .update(updates);
                resolve();
              }
            })
            .catch(({ code, message }) => {
              reject(this.getErrorMessage(code) || message);
            });
        })
        .catch(err => reject(err));
    });
  resetPassword = (email: string, lang: string = 'en') =>
    new Promise<void>((resolve, reject) => {
      const auth = this.auth();
      auth.languageCode = lang;
      auth
        .sendPasswordResetEmail(email)
        .then(() => resolve())
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  getUser = () =>
    new Promise<Object>((resolve, reject) => {
      this.database() // $FlowFixMe
        .ref(`users/private/${this.auth().currentUser.uid}`)
        // $FlowFixMe
        .once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error.message));
    });
  isUsernameDuplicated = (username: string) =>
    new Promise<void>((resolve, reject) => {
      this.database()
        .ref('users/public')
        .orderByChild('username')
        .equalTo(username) // $FlowFixMe
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            reject('username-already-exists');
          } else {
            resolve();
          }
        })
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  getLeaderboard = () =>
    new Promise<Object>((resolve, reject) => {
      this.database()
        .ref('users/public')
        .orderByChild('points') // $FlowFixMe
        .once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        })
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  updateUserOnDB = (
    _updates: Object,
    _public: boolean = false,
    _private: boolean = true,
  ) =>
    new Promise<void>((resolve, reject) => {
      if (!_public && !_private) return;
      // $FlowFixMe
      const { uid } = this.auth().currentUser;
      const promises = [];
      if (_public)
        promises.push(
          this.database()
            .ref(`users/public/${uid}`)
            .update(_updates),
        );
      if (_private)
        promises.push(
          this.database()
            .ref(`users/private/${uid}`)
            .update(_updates),
        );
      Promise.all(promises)
        .then(() => resolve())
        .catch(() => reject('an-error-occured-please-try-again-later'));
    });
  updateUserEmail = (email: string) =>
    new Promise<void>((resolve, reject) => {
      this.auth() // $FlowFixMe
        .currentUser.updateEmail(email)
        .then(() => this.updateUserOnDB({ email }).then(() => resolve()))
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  updateUserPassword = (password: string) =>
    new Promise<void>((resolve, reject) => {
      this.auth() // $FlowFixMe
        .currentUser.updatePassword(password)
        .then(() => resolve())
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  reauthenticate = (password: string) =>
    new Promise<void>((resolve, reject) => {
      const user = this.auth().currentUser;
      const credintial = this.auth.EmailAuthProvider.credential(
        // $FlowFixMe
        user.email,
        password,
      );
      user // $FlowFixMe
        .reauthenticateWithCredential(credintial)
        .then(() => resolve())
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  getAsset = (assetId: string) =>
    new Promise<string>((resolve, reject) => {
      this.storage()
        .ref(`audio/${assetId}.mp3`)
        .getDownloadURL()
        .then(url => resolve(url))
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  updateUserPoints = (newPoints: number) =>
    new Promise<void>((resolve, reject) => {
      this.getUser()
        .then(({ points }) => {
          this.updateUserOnDB({ points: points + newPoints }, true)
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => reject());
    });
  updateUserLastPlayed = (lastPlayed: string) =>
    new Promise<void>(() => {
      this.updateUserOnDB({ lastPlayed }, true)
        .then(() => {})
        .catch(() => {});
    });
}

const FirebaseContext: React.Context<Object> = React.createContext(null);

const withFirebase = (Component: React.ElementType) => (props: {}) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext, withFirebase };
export default Firebase;
