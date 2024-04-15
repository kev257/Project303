import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from './screens/ListScreen';
import SettingScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';


const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: { position: 'fixed'},  }}>
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="List" component={ListScreen} />
       <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

