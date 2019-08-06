// @flow
import React from 'react';
import { Alert, View, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import { TextInput, Button, Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withTranslation } from 'react-i18next';
import { DropDown } from '../Components';
import { withFirebase } from '../Firebase';

type State = {
  isSubmitting: boolean,
};
type Props = {
  navigation: Object,
  firebase: Object,
  t: Function,
  i18n: Object,
};
class Container extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isSubmitting: false,
    };
  }

  submit = (values: Object) => {
    const { firebase, t, i18n } = this.props;
    const changeIsSubmitting = isSubmitting => this.setState({ isSubmitting });
    if (
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)
    ) {
      changeIsSubmitting(true);
      firebase
        .resetPassword(values.email, i18n.language)
        .then(() => {
          DropDown.success(t('email-sent'));
        })
        .catch(error => Alert.alert(t(error)))
        .finally(() => changeIsSubmitting(false));
    } else DropDown.error(t('invalid-email'));
  };

  render() {
    const { navigation, t } = this.props;
    return (
      <Formik
        initialValues={{
          email: navigation.getParam('email', ''),
        }}
        onSubmit={this.submit}
        render={({ values, handleBlur, handleChange, handleSubmit }) => (
          <KeyboardAwareScrollView style={{ backgroundColor: '#F6F6F6' }}>
            <View style={styles.container}>
              <View>
                <Text style={styles.helperText}>
                  {t(
                    'enter-your-email-below-to-send-instructions-to-reset-your-password',
                  )}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  autoFocus
                  label={t('email')}
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  mode="outlined"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.button}
                  disabled={this.state.isSubmitting}>
                  {t('send')}
                </Button>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      />
    );
  }
}

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.8,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  helperText: {
    fontSize: 20,
  },
  inputContainer: {
    paddingVertical: 20,
  },
  input: {
    marginVertical: 8,
  },
  buttonContainer: {
    paddingVertical: 4,
  },
  button: {
    paddingVertical: 5,
    marginHorizontal: 12,
    marginVertical: 8,
  },
});

export default withTranslation()(withFirebase(Container));
