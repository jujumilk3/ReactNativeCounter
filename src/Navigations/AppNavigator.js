import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {
  CounterScreen,
  OtherScreen,
  ListScreen,
  CalendarScreen,
} from '../screens/index';
import config from '../config/config';

// console.log(config);
const Drawer = createDrawerNavigator();
let showOtherPage = false;
if (config.NODE_ENV === 'development' && config.DEBUG) {
  showOtherPage = true;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          options={{headerShown: true}}
          name="Counter"
          component={CounterScreen}
        />
        <Drawer.Screen
          options={{headerShown: true}}
          name="Calendar"
          component={CalendarScreen}
        />
        <Drawer.Screen
          options={{headerShown: true}}
          name="List"
          component={ListScreen}
        />
        {showOtherPage && (
          <Drawer.Screen
            options={{headerShown: true}}
            name="Others"
            component={OtherScreen}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
