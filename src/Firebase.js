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
  errors: Array<string>;

  constructor() {
    this.auth = firebase.auth;
    this.database = firebase.database;
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
                updates['users/' + user.uid] = {
                  uid: user.uid,
                  username: username,
                  email: email,
                  language: language,
                  points: 0,
                  lastPlayed: '3 days ago',
                  isEmailVerified: false,
                };
                this.database() // $FlowFixMe
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
          console.log(code, message)
          reject(this.getErrorMessage(code) || message);
        });
    });
  getUser = () =>
    new Promise<void>((resolve, reject) => {
      this.database() // $FlowFixMe
        .ref(`users/${this.auth().currentUser.uid}`) // $FlowFixMe
        .once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error.message));
    });
  isUsernameDuplicated = (username: string) =>
    new Promise<void>((resolve, reject) => {
      this.database()
        .ref('users')
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
    new Promise<void>((resolve, reject) => {
      this.database()
        .ref('users')
        .orderByChild('points') // $FlowFixMe
        .once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        })
        .catch(({ code, message }) => {
          reject(this.getErrorMessage(code) || message);
        });
    });
  updateUserOnDB = (updates: Object) =>
    new Promise<void>((resolve, reject) => {
      this.database() // $FlowFixMe
        .ref(`users/${this.auth().currentUser.uid}`)
        .update(updates)
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
}

const FirebaseContext: React.Context<Object> = React.createContext(null);

const withFirebase = (Component: React.ElementType) => (props: {}) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext, withFirebase };
export default Firebase;
