import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { removeAuth, authInitialState } from '../../redux/authSlice';

export const GoBackBtn = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginLeft: 16 }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Feather name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

export const LogoutBtn = props => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(authInitialState.user);
        dispatch(removeAuth(authInitialState.user));
      }}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

export const AddPostBtn = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FF6C00',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
