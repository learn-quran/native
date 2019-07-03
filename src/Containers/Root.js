// @flow
import React from 'react';
import { I18nManager } from 'react-native';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';
import * as RNLocalize from 'react-native-localize';

import AppContainer from '../Navigation';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../Actions';

type Props = {
  navigation: Object,
  i18n: Object,
  configs: Object,
  changeLanguage: typeof changeLanguage,
};
class Root extends React.Component<Props> {
  constructor(props) {
    super(props);
    RNLocalize.addEventListener('change', this.languageChangeHandler);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.languageChangeHandler);
  }

  languageChangeHandler = () => {
    const { i18n, changeLanguage } = this.props;
    const locale = RNLocalize.getLocales()[0].languageCode;
    if (i18n.language !== locale) {
      changeLanguage(locale);
      i18n.changeLanguage(locale).then(() => {
        I18nManager.forceRTL(locale === 'ar');
        I18nManager.allowRTL(locale === 'ar');
        if (
          (locale === 'ar' && !I18nManager.isRTL) ||
          (locale === 'en' && I18nManager.isRTL)
        ) {
          setTimeout(() => {
            RNRestart.Restart();
          }, 0);
        }
      });
    }
  };

  render() {
    return <AppContainer />;
  }
}

const mapStateToProps = ({ configs }) => ({ configs });
const mapDispatchToProps = { changeLanguage };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Root));
