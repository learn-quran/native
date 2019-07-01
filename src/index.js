/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import { YellowBox, I18nManager } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import DropdownContainer from 'react-native-dropdownalert';
import RNRestart from 'react-native-restart';
import * as RNLocalize from 'react-native-localize';

import { Root } from './Containers';
import { DropDown } from './Components';
import { store, persistor } from './Store';
import Firebase, { FirebaseContext } from './Firebase';

import './I18n';
import { withTranslation } from 'react-i18next';

YellowBox.ignoreWarnings(['Remote debugger']);

type Props = {
  i18n: Object,
};
class App extends React.Component<Props> {
  componentDidMount() {
    RNLocalize.addEventListener('change', this.languageChangeHandler);
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.languageChangeHandler);
  }

  languageChangeHandler = () => {
    const { i18n } = this.props;
    const locale = RNLocalize.getLocales()[0].languageCode;
    if (i18n.language !== locale) {
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
    return (
      <Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <FirebaseContext.Provider value={new Firebase()}>
                <Root />
              </FirebaseContext.Provider>
            </PaperProvider>
          </PersistGate>
        </Provider>
        <DropdownContainer ref={o => DropDown.setDropDown(o)} />
      </Fragment>
    );
  }
}

export default withTranslation()(App);
