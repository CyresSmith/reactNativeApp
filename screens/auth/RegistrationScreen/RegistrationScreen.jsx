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

import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { setAuth, setUser } from '../../../redux/authSlice';

import { authSignUpUser } from '../../../redux/operations';

import Avatar from '../../shared/Avatar/Avatar';
import { PrimaryBtn } from '../../shared/SharedBtns';

import sharedStyles from '../../shared/sharedStyles';

import useKeyboardShownToggle from '../../shared/Utils/useKeyboardShownToggle';

const userInitialState = {
  nickname: null,
  email: null,
  password: null,
};

const inputFocusInitialState = {
  nickname: false,
  email: false,
  pass: false,
  photoURL: null,
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

  const { nickname, email, password } = userState;

  const onRegistrationBtnClick = () => {
    if (nickname && email && password) {
      dispatch(authSignUpUser(userState));
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
              <Avatar setUserState={setUserState} />

              <Text style={sharedStyles.authTitle}>Реєстрація</Text>

              <View style={{ width: 343 }}>
                <TextInput
                  style={{
                    ...sharedStyles.authInput,
                    marginTop: 33,
                    borderColor: isInputFocused.nickname
                      ? '#FF6C00'
                      : '#E8E8E8',
                  }}
                  placeholder={'Нікнейм'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'text'}
                  value={userState.nickname}
                  onFocus={() => {
                    !keyboardShown && keyboardShownToggle();
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      nickname: true,
                    }));
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setUserState(prevState => ({
                      ...prevState,
                      nickname: value,
                    }));
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
                    <PrimaryBtn
                      onPress={onRegistrationBtnClick}
                      disabled={nickname && email && password ? false : true}
                      label="Зареєструватися"
                      marginTop={windowWidth < 400 ? 43 : 16}
                    />

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
