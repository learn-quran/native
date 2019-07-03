import { createStackNavigator } from 'react-navigation';

import { Login } from '../Containers';

const navigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default navigator;
