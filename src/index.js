/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import { YellowBox } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import DropdownContainer from 'react-native-dropdownalert';

import { Root } from './Containers';
import { DropDown } from './Components';
import { store, persistor } from './Store';
import Firebase, { FirebaseContext } from './Firebase';
import { getTheme } from './Theme';

import './I18n';
import { withTranslation } from 'react-i18next';

YellowBox.ignoreWarnings(['Remote debugger']);

type Props = {
  t: Function,
};
class App extends React.Component<Props> {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider theme={getTheme(this.props.t('lang-code'))}>
              <FirebaseContext.Provider value={new Firebase()}>
                <Root />
              </FirebaseContext.Provider>
            </PaperProvider>
          </PersistGate>
        </Provider>
        <DropdownContainer
          ref={o => DropDown.setDropDown(o)}
          closeInterval={2800}
        />
      </Fragment>
    );
  }
}

export default withTranslation()(App);
