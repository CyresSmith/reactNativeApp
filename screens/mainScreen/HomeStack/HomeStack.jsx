import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const HomeStack = createNativeStackNavigator();

import MainTabNavigator from '../MainTabNavigation/MainTabNavigation';
import CommentsScreen from '../CommentsScreen/CommentsScreen';
import MapScreen from '../MapScreen/MapScreen';
import CameraScreen from '../CameraScreen/CameraScreen';

const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={MainTabNavigator}
      />
      <HomeStack.Screen
        // options={}
        name="Коментарі"
        component={CommentsScreen}
      />
      <HomeStack.Screen
        // options={{ headerShown: false }}
        name="Місце"
        component={MapScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Камера"
        component={CameraScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
