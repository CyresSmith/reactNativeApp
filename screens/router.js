import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import LoginScreen from './auth/LoginScreen/';
import RegistrationScreen from './auth/RegistrationScreen';

import CreatePostsScreen from './mainScreen/CreatePostsScreen';
import ProfileScreen from './mainScreen/ProfileScreen';

import PostsScreenStack from './mainScreen/PostsScreen/PostsScreenStack/PostScreenStack';

import { GoBackBtn, AddPostBtn } from './shared/SharedBtns';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = auth => {
  if (auth === false) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        initialRouteName: 'PostsScreen',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreenStack}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          // headerRight: props => <LogoutBtn {...props} />,
          // headerRightContainerStyle: {
          //   paddingRight: 16,
          // },
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
          tabBarIconStyle: {},
          // tabBarStyle: { display: 'none' },
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

export default useRoute;
