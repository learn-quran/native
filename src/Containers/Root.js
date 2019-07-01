// @flow
import React from 'react';
import { I18nManager } from 'react-native';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';

import AppContainer from '../Navigation';
import { withTranslation } from 'react-i18next';

type Props = {
  navigation: Object,
  i18n: Object,
  configs: Object,
};
class Root extends React.Component<Props> {
  constructor(props) {
    super(props);
    const {
      configs: { language },
      i18n,
    } = props;
    if (i18n.language !== language) {
      i18n.changeLanguage(language).then(() => {
        I18nManager.forceRTL(language === 'ar');
        I18nManager.allowRTL(language === 'ar');
        if (
          (language === 'ar' && !I18nManager.isRTL) ||
          (language === 'en' && I18nManager.isRTL)
        ) {
          setTimeout(() => {
            RNRestart.Restart();
          }, 0);
        }
      });
    }
  }

  render() {
    return <AppContainer />;
  }
}

const mapStateToProps = ({ configs }) => ({ configs });

export default connect(mapStateToProps)(withTranslation()(Root));
