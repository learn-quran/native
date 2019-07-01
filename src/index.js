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

import { DropDown } from './Components';
import AppContainer from './Navigation';
import { store, persistor } from './Store';
import Firebase, { FirebaseContext } from './Firebase';

YellowBox.ignoreWarnings(['Remote debugger']);

type Props = {};
class App extends React.Component<Props> {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <FirebaseContext.Provider value={new Firebase()}>
                <AppContainer />
              </FirebaseContext.Provider>
            </PaperProvider>
          </PersistGate>
        </Provider>
        <DropdownContainer ref={o => DropDown.setDropDown(o)} />
      </Fragment>
    );
  }
}

export default App;
