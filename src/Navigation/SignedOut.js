import { createStackNavigator } from 'react-navigation';

import { Login, Signup } from '../Containers';

// This throws an error if imported from the index in src/Containers -- I HAVE NO IDEA WHY
import ForgotPassword from '../Containers/ForgotPassword';
import Walkthrough from '../Containers/Walkthrough';

const navigator = createStackNavigator(
  {
    Walkthrough: {
      screen: Walkthrough,
    },
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRouteName: 'Walkthrough',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default navigator;
