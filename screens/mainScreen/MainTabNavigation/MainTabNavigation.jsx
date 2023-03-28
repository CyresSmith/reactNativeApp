import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

import PostsScreen from '../PostsScreen/PostsScreen';
import CreatePostsScreen from '../CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

import { GoBackBtn, AddPostBtn, LogoutBtn } from '../../shared/SharedBtns';

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        initialRouteName: 'Публікації',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: props => <LogoutBtn {...props} />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
          tabBarIconStyle: {},
        }}
      />
      <MainTab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          headerLeft: props => <GoBackBtn {...props} />,
          tabBarButton: props => <AddPostBtn {...props} />,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="plus" size={20} color="#fff" />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
