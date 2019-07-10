import { createStackNavigator } from 'react-navigation';

import { Login, Signup } from '../Containers';

// This throws an error if imported from the index in src/Containers -- I HAVE NO IDEA WHY
import ForgotPassword from '../Containers/ForgotPassword';

const navigator = createStackNavigator(
  {
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
    initialRouteName: 'Signup',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default navigator;
