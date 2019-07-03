import { createStackNavigator } from 'react-navigation';

import { Home } from '../Containers';

const navigator = createStackNavigator(
  {
    Home,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default navigator;
