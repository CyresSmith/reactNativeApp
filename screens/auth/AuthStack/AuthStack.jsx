import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../LoginScreen';
import RegistrationScreen from '../RegistrationScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigation = () => {
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
};

export default AuthStackNavigation;
