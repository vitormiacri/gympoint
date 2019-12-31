import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';

import New from '~/pages/HelpOrder/New';
import Show from '~/pages/HelpOrder/Show';
import List from '~/pages/HelpOrder/List';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin,
            HelpOrder: {
              screen: createStackNavigator(
                {
                  List,
                  Show,
                  New,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              inactiveTintColor: '#999',
              activeTintColor: '#EE4E62',
              labelStyle: {
                paddingBottom: 10,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
