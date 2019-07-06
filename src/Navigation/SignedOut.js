import { createStackNavigator } from 'react-navigation';

import { Login, Signup } from '../Containers';

const navigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
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
