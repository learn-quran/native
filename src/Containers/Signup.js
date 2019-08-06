// @flow
import * as React from 'react';
import * as Yup from 'yup';
import { Alert, View, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DropDown } from '../Components';
import { withFirebase } from '../Firebase';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .required('email-is-required')
    .email('invalid-email'),
  username: Yup.string()
    .required('username-is-required')
    .min(3, 'username-too-short')
    .matches(
      /^(?:[\u0600-\u065f]+|[a-z]+)$/i,
      'username-can-only-contain-letters',
    ),
  password: Yup.string()
    .required('password-is-required')
    .min(6, 'password-is-too-short'),
  passwordConfirmation: Yup.string().required(
    'password-confirmation-is-required',
  ),
});

type State = {
  isSubmitting: boolean,
};
type Props = {
  firebase: Object,
  navigation: Object,
  t: Function,
  configs: Object,
};
class Signup extends React.Component<Props, State> {
  username: React.ElementRef<TextInput>;
  password: React.ElementRef<TextInput>;
  passwordConfirmation: React.ElementRef<TextInput>;

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
    };
  }

  submit = (values: Object) => {
    const { firebase, t, configs } = this.props;
    const changeIsSubmitting = isSubmitting => this.setState({ isSubmitting });
    if (values.password !== values.passwordConfirmation) {
      DropDown.error(t('passwords-dont-match'));
    } else {
      changeIsSubmitting(true);
      SignupSchema.validate(values, {
        strict: true,
        stripUnknown: true,
      })
        .then(() => {
          firebase
            .createUser({
              ...values,
              language: configs.language,
            })
            .then(() => {})
            .catch(error => {
              Alert.alert(t(error));
              changeIsSubmitting(false);
            });
        })
        .catch(({ message }) => {
          if (message !== 'NO_MESSAGE') {
            DropDown.error(t(message));
          }
          changeIsSubmitting(false);
        });
    }
  };

  render() {
    const { t, navigation } = this.props;
    return (
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={this.submit}>
        {({ values, handleBlur, handleChange, handleSubmit }) => (
          <KeyboardAwareScrollView style={{ backgroundColor: '#F6F6F6' }}>
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <TextInput
                  autoFocus
                  label={t('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  mode="outlined"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => this.username.focus()}
                />
                <TextInput
                  label={t('username')}
                  value={values.username}
                  //helperText={t('this-will-be-used-on-the-leaderboard')}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  mode="outlined"
                  autoCapitalize="none"
                  returnKeyType="next"
                  ref={o => (this.username = o)}
                  onSubmitEditing={() => this.password.focus()}
                />
                <TextInput
                  secureTextEntry
                  mode="outlined"
                  label={t('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  returnKeyType="next"
                  ref={o => (this.password = o)}
                  onSubmitEditing={() => this.passwordConfirmation.focus()}
                />
                <TextInput
                  secureTextEntry
                  mode="outlined"
                  label={t('password-confirmation')}
                  value={values.passwordConfirmation}
                  onChangeText={handleChange('passwordConfirmation')}
                  onBlur={handleBlur('passwordConfirmation')}
                  returnKeyType="done"
                  ref={o => (this.passwordConfirmation = o)}
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={this.state.isSubmitting}
                  loading={this.state.isSubmitting}>
                  {t('sign-up')}
                </Button>
                <Button
                  mode="text"
                  style={styles.button}
                  onPress={() => navigation.navigate('Login')}>
                  {t('already-have-an-account')}
                </Button>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    );
  }
}

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.95,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  inputsContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
    paddingVertical: 15,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 5,
    marginHorizontal: 12,
    marginVertical: 8,
  },
});

const mapStateToProps = ({ configs }) => ({ configs });

export default connect(mapStateToProps)(
  withTranslation()(withFirebase(Signup)),
);
