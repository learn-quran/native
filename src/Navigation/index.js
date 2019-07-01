import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

import { Splash } from '../Containers';

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Splash,
    SignedIn,
    SignedOut,
  }),
);

export default AppContainer;
