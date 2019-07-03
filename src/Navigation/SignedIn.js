import { createStackNavigator } from 'react-navigation';

import { Home } from '../Containers';

const navigator = createStackNavigator(
  {
    Home,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default navigator;
