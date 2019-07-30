// @flow
import React from 'react';
import RNRestart from 'react-native-restart';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  SafeAreaView,
  I18nManager,
  Linking,
} from 'react-native';
import { Button, Portal, Dialog, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withFirebase } from '../Firebase';
import { changeLanguage } from '../Actions';
import { Authors } from '../Assets';

type Props = {
  firebase: Object,
  t: Function,
  i18n: Object,
  configs: Object,
  changeLanguage: typeof changeLanguage,
};
type State = {
  visible: boolean,
};
class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  logout = () => this.props.firebase.auth().signOut();
  changeLanguage = () => {
    const language = this.props.configs.language === 'en' ? 'ar' : 'en';
    this.props.changeLanguage(language);
    this.props.i18n.changeLanguage(language).then(() => {
      I18nManager.forceRTL(language === 'ar');
      I18nManager.allowRTL(language === 'ar');
      this.props.firebase.updateUserOnDB({ language });
      if (
        (language === 'ar' && !I18nManager.isRTL) ||
        (language === 'en' && I18nManager.isRTL)
      ) {
        setTimeout(() => {
          RNRestart.Restart();
        }, 0);
      }
    });
  };
  openUrl = url => Linking.canOpenURL(url) && Linking.openURL(url);

  render() {
    const { props, logout, changeLanguage } = this;
    const { t } = props;
    return (
      <React.Fragment>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Button mode="contained" onPress={logout} style={styles.button}>
              <Text style={styles.buttonText}>{t('log-out')}</Text>
            </Button>
            <Button
              mode="contained"
              onPress={changeLanguage}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {props.configs.language === 'ar'
                  ? 'Change Language to English'
                  : 'تغيير إلى اللغة العربية'}
              </Text>
            </Button>
            <Button
              mode="contained"
              onPress={() => this.setState({ visible: true })}
              style={styles.button}>
              <Text style={styles.buttonText}>{t('about')}</Text>
            </Button>
          </View>
        </SafeAreaView>
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}>
            <Dialog.Title>{t('about')}</Dialog.Title>
            <Dialog.Content>
              {Object.values(Authors).map(({ name, urls }: Object, i) => (
                <View style={styles.author} key={i}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{name[t('lang-code')]}</Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    {urls.twitter && (
                      <Icon
                        name="twitter"
                        style={styles.icon}
                        onPress={() => this.openUrl(urls.twitter)}
                      />
                    )}
                    {urls.github && (
                      <Icon
                        name="github-circle"
                        style={styles.icon}
                        onPress={() => this.openUrl(urls.github)}
                      />
                    )}
                    {urls.facebook && (
                      <Icon
                        name="facebook"
                        style={styles.icon}
                        onPress={() => this.openUrl(urls.facebook)}
                      />
                    )}
                    {urls.behance && (
                      <Icon
                        name="behance"
                        style={styles.icon}
                        onPress={() => this.openUrl(urls.behance)}
                      />
                    )}
                  </View>
                </View>
              ))}
            </Dialog.Content>
          </Dialog>
        </Portal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: 8,
    borderRadius: 13,
  },
  buttonText: {
    color: '#f9f7ec',
    fontSize: 16,
  },
  author: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#B9994E',
    borderWidth: 0.1,
    borderRadius: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    marginVertical: '6%',
  },
  nameContainer: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  name: {
    fontSize: 24,
    color: '#f9f7ec',
  },
  iconsContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  icon: {
    fontSize: 28,
    color: '#f9f7ec',
  },
});

const mapStateToProps = ({ configs }) => ({ configs });
const mapDispatchToProps = { changeLanguage };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(withFirebase(Settings)));
