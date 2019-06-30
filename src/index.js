/**
 * @format
 * @flow
 */
import React from 'react';
import { YellowBox } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppContainer from './Navigation';

import { store, persistor } from './store';

YellowBox.ignoreWarnings(['Remote debugger']);

type Props = {};
class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
