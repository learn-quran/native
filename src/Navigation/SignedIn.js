/* eslint-disable react/display-name */
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Settings } from '../Containers';

/// This throws an error if imported from the index in src/Containers -- I HAVE NO IDEA WHY
import Account from '../Containers/Account';
import Player from '../Containers/Player';

const navigator = createMaterialBottomTabNavigator(
  {
    Player: {
      screen: Player,
    },
    Account: {
      screen: Account,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    initialRouteName: 'Player',
    shifting: true,
    labeled: false,
    barStyle: {
      backgroundColor: '#B9994E',
    },
    activeTintColor: 'white',
    inactiveTintColor: '#4F4F4F',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }: Object) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Player':
            iconName = 'play';
            break;
          case 'Account':
            iconName = 'account';
            break;
          case 'Settings':
            iconName = 'settings';
            break;
        }
        return (
          <Icon
            name={iconName}
            size={focused ? 26 : 22}
            style={{
              color: tintColor,
            }}
          />
        );
      },
    }),
  },
);

export default navigator;
