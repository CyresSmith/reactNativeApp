import {
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { setAuth, setUser } from '../../../redux/authSlice';

import Avatar from '../../shared/Avatar/Avatar';

import styles from './RegistrationScreenStyles';
import sharedStyles from '../../shared/sharedStyles';

import useKeyboardShownToggle from '../../shared/Utils/useKeyboardShownToggle';

const userInitialState = {
  login: null,
  email: null,
  password: null,
  userId: null,
  posts: [],
};

const inputFocusInitialState = {
  login: false,
  email: false,
  pass: false,
};

export default function RegistrationScreen({ navigation }) {
  const [userState, setUserState] = useState(userInitialState);
  const [hidePass, setHidePass] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );
  const [isInputFocused, setIsInputFocused] = useState(inputFocusInitialState);

  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();

  const dispatch = useDispatch();

  const onRegistrationBtnClick = () => {
    const { login, email, password } = userState;

    if (login && email && password) {
      dispatch(setUser({ ...userState, userId: nanoid() }));
      dispatch(setAuth(true));
      keyboardShownToggle();
      setUserState(userInitialState);
    }
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
    };

    Dimensions.addEventListener('change', onChange);

    // return () => {
    //   Dimensions.removeEventListener('change', onChange);
    // };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        keyboardShown && keyboardShownToggle();
      }}
    >
      <View style={sharedStyles.container}>
        <ImageBackground
          style={sharedStyles.backgroundImage}
          source={require('../../../assets/images/sergio-souza.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
          >
            <View
              style={{
                ...sharedStyles.formBackground,
                paddingBottom:
                  windowWidth < 400 ? (keyboardShown ? 32 : 80) : 16,
                marginHorizontal: windowWidth < 400 ? 0 : 130,
              }}
            >
              <Avatar />

              <Text style={sharedStyles.authTitle}>Реєстрація</Text>

              <View style={{ width: 343 }}>
                <TextInput
                  style={{
                    ...sharedStyles.authInput,
                    marginTop: 33,
                    borderColor: isInputFocused.login ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder={'Логін'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'text'}
                  value={userState.login}
                  onFocus={() => {
                    !keyboardShown && keyboardShownToggle();
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      login: true,
                    }));
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setUserState(prevState => ({ ...prevState, login: value }));
                  }}
                  onSubmitEditing={keyboardShownToggle}
                />

                <TextInput
                  style={{
                    ...sharedStyles.authInput,
                    marginTop: 16,
                    borderColor: isInputFocused.email ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder={'Адреса електронної пошти'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'email'}
                  keyboardType={'email-address'}
                  value={userState.email}
                  onFocus={() => {
                    !keyboardShown && keyboardShownToggle();
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      email: true,
                    }));
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setUserState(prevState => ({ ...prevState, email: value }));
                  }}
                  onSubmitEditing={keyboardShownToggle}
                />

                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={{
                      ...sharedStyles.authInput,
                      marginTop: 16,
                      borderColor: isInputFocused.pass ? '#FF6C00' : '#E8E8E8',
                    }}
                    placeholder={'Пароль'}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={hidePass}
                    value={userState.password}
                    onFocus={() => {
                      !keyboardShown && keyboardShownToggle();
                      setIsInputFocused(prevState => ({
                        ...prevState,
                        pass: true,
                      }));
                    }}
                    onBlur={() => setIsInputFocused(inputFocusInitialState)}
                    onChangeText={value => {
                      setUserState(prevState => ({
                        ...prevState,
                        password: value,
                      }));
                    }}
                    onSubmitEditing={keyboardShownToggle}
                  />
                  <TouchableOpacity
                    style={sharedStyles.passShow}
                    activeOpacity={0.75}
                    onPressIn={() => setHidePass(false)}
                    onPressOut={() => setHidePass(true)}
                  >
                    <Text style={sharedStyles.passShowText}>Показати</Text>
                  </TouchableOpacity>
                </View>

                {keyboardShown === false && (
                  <>
                    <TouchableOpacity
                      style={{
                        ...sharedStyles.authBtn,
                        marginTop: windowWidth < 400 ? 43 : 16,
                      }}
                      activeOpacity={0.75}
                      onPress={() => {
                        onRegistrationBtnClick();
                      }}
                    >
                      <Text style={sharedStyles.authBtnText}>
                        Зареєструватися
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={sharedStyles.authRedirect}>
                        Вже є обліковий запис? Увійти
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
