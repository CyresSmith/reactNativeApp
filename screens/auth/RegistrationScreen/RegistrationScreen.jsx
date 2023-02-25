import {
  TextInput,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from 'react-native';
import Union from '../components/union';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import styles from './RegistrationScreenStyles';

const authInitialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
};

const inputFocusInitialState = {
  login: false,
  email: false,
  pass: false,
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [authState, setAuthState] = useState(authInitialState);
  const [hidePass, setHidePass] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );
  const [isInputFocused, setIsInputFocused] = useState(inputFocusInitialState);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    if (image !== null) {
      setImage(null);
      setAuthState(prevState => ({ ...prevState, avatar: image }));
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setAuthState(prevState => ({
          ...prevState,
          avatar: result.assets[0].uri,
        }));
      }
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onRegistrationBtnClick = () => {
    console.log(authState);
    setAuthState(authInitialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('../../../assets/images/sergio-souza.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'bottom padding'}
          >
            <View
              style={{
                ...styles.formBackground,
                paddingBottom:
                  windowWidth < 400 ? (isShowKeyboard ? 32 : 80) : 16,
                marginHorizontal: windowWidth < 400 ? 0 : 130,
              }}
            >
              <View>
                <View style={styles.avatarBackground}>
                  {image && (
                    <Image style={styles.avatar} source={{ uri: image }} />
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.avatarAdd,
                    borderColor: image ? '#E8E8E8' : '#FF6C00',
                  }}
                  onPress={() => pickImage()}
                >
                  <Union
                    style={{
                      transform: [{ rotate: image ? '45deg' : '0deg' }],
                      fill: image ? '#E8E8E8' : '#FF6C00',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.registrationTitle}>Реєстрація</Text>

              <View style={{ width: 343 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    marginTop: 33,
                    borderColor: isInputFocused.login ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder={'Логін'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'text'}
                  value={authState.login}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      login: true,
                    }));
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setAuthState(prevState => ({ ...prevState, login: value }));
                  }}
                  onSubmitEditing={keyboardHide}
                />

                <TextInput
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor: isInputFocused.email ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder={'Адреса електронної пошти'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'email'}
                  keyboardType={'email-address'}
                  value={authState.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      email: true,
                    }));
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setAuthState(prevState => ({ ...prevState, email: value }));
                  }}
                  onSubmitEditing={keyboardHide}
                />

                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginTop: 16,
                      borderColor: isInputFocused.pass ? '#FF6C00' : '#E8E8E8',
                    }}
                    placeholder={'Пароль'}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={hidePass}
                    value={authState.password}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsInputFocused(prevState => ({
                        ...prevState,
                        pass: true,
                      }));
                    }}
                    onBlur={() => setIsInputFocused(inputFocusInitialState)}
                    onChangeText={value => {
                      setAuthState(prevState => ({
                        ...prevState,
                        password: value,
                      }));
                    }}
                    onSubmitEditing={keyboardHide}
                  />
                  <TouchableOpacity
                    style={styles.passShow}
                    activeOpacity={0.75}
                    onPressIn={() => setHidePass(false)}
                    onPressOut={() => setHidePass(true)}
                  >
                    <Text style={styles.passShowText}>Показати</Text>
                  </TouchableOpacity>
                </View>

                {!isShowKeyboard && (
                  <>
                    <TouchableOpacity
                      style={{
                        ...styles.signUpBtn,
                        marginTop: windowWidth < 400 ? 43 : 16,
                      }}
                      activeOpacity={0.75}
                      onPress={() => {
                        keyboardHide();
                        onRegistrationBtnClick();
                      }}
                    >
                      <Text style={styles.signUpBtnText}>Зареєструватися</Text>
                    </TouchableOpacity>
                    <Text style={styles.signInRedirect}>
                      Вже є обліковий запис? Увійти
                    </Text>
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
