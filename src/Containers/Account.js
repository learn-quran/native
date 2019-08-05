// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DropDown } from '../Components';
import { withFirebase } from '../Firebase';
import { InputCard } from '../Components';

type Props = {
  firebase: Object,
  t: Function,
};
type State = {
  isSubmitting: boolean,
  user: Object,
};
class Account extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      user: {},
    };
  }

  componentDidMount() {
    this.persistUserInfo();
  }

  persistUserInfo = () => {
    const { firebase, t } = this.props;
    firebase
      .getUser()
      .then(user => {
        this.setState({ user });
      })
      .catch(() => {
        DropDown.error(
          t('something-went-wrong-please-close-the-tab-and-try-again'),
        );
      });
  };

  onUsernameSubmit = username => {
    const { firebase, t } = this.props;
    if (username.length >= 3) {
      if (username !== this.state.user.username) {
        if (/^(?:[\u0600-\u065f]+|[a-z]+)$/i.test(username)) {
          firebase
            .isUsernameDuplicated(username)
            .then(() => {
              this.setState({ isSubmitting: true });
              firebase
                .updateUserOnDB({ username }, true)
                .then(() =>
                  DropDown.success(t('your-username-has-been-updated')),
                )
                .catch(err => DropDown.error(t(err)))
                .finally(() => {
                  this.setState({ isSubmitting: false });
                  this.persistUserInfo();
                });
            })
            .catch(err => DropDown.error(t(err)));
        } else DropDown.error(t('username-can-only-contain-letters'));
      }
    } else DropDown.error(t('username-too-short'));
  };
  onEmailSubmit = email => {
    const { firebase, t } = this.props;
    if (
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)
    ) {
      if (email !== this.state.user.email) {
        this.setState({ isSubmitting: true });
        firebase
          .updateUserEmail(email)
          .then(() => DropDown.success(t('your-email-has-been-updated')))
          .catch(err => DropDown.error(t(err)))
          .finally(() => {
            this.setState({ isSubmitting: false });
            this.persistUserInfo();
          });
      }
    } else DropDown.error('Invalid email');
  };
  onPasswordSubmit = password => {
    const { firebase, t } = this.props;
    if (password.length > 1) {
      if (password.length > 6) {
        this.setState({ isSubmitting: true });
        firebase
          .updateUserPassword(password)
          .then(() => {
            DropDown.success(t('password-updated-successfully'));
          })
          .catch(err => DropDown.error(t(err)))
          .finally(() => {
            this.setState({ isSubmitting: false });
          });
      } else DropDown.error(t('password-is-too-short'));
    }
  };
  onReauthSubmit = password => {
    const { firebase, t } = this.props;
    if (password.length > 1 && password.length > 6) {
      this.setState({ isSubmitting: true });
      firebase
        .reauthenticate(password)
        .then(() => {
          DropDown.success(t('account-reauthenticated-successfully'));
        })
        .catch(err => DropDown.error(t(err)))
        .finally(() => {
          this.setState({ isSubmitting: false });
        });
    }
  };

  render() {
    const { state, props } = this;
    const { t } = props;
    return (
      <KeyboardAwareScrollView>
        {!!this.state.user && (
          <View style={styles.container}>
            <InputCard
              label={t('username')}
              inheritedValue={state.user.username}
              onSubmit={this.onUsernameSubmit}
              buttonText={t('change-username')}
              isSubmitting={state.isSubmitting}
            />
            <InputCard
              label={t('email')}
              inheritedValue={state.user.email}
              onSubmit={this.onEmailSubmit}
              buttonText={t('change-email')}
              isSubmitting={state.isSubmitting}
              keyboardType="email-address"
            />
            <InputCard
              secureTextEntry
              label={t('password')}
              helperText={t(
                'enter-your-new-password-below-you-need-to-be-recently-logged-in-to-change-your-password',
              )}
              onSubmit={this.onPasswordSubmit}
              buttonText={t('change-password')}
              isSubmitting={state.isSubmitting}
            />
            <InputCard
              secureTextEntry
              label={t('password')}
              helperText={t(
                'enter-your-password-below-to-re-authenticate-your-account',
              )}
              onSubmit={this.onReauthSubmit}
              buttonText={t('re-authenticate')}
              isSubmitting={state.isSubmitting}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default withTranslation()(withFirebase(Account));
