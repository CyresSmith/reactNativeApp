import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import * as Location from 'expo-location';

import { Feather } from '@expo/vector-icons';

import useKeyboardShownToggle from '../../shared/Utils/useKeyboardShownToggle';

import { addPost } from '../../../redux/authSlice';

import sharedStyles from '../../shared/sharedStyles';
import { PrimaryBtn, PrimaryIconBtn } from '../../shared/SharedBtns';
import DescriptionTextInput from './components/DecriptionTextInput/DecriptionTextInput';
import ImageBox from './components/ImageBox/ImageBox';

const postInitialState = {
  likes: [],
  comments: [],
  title: '',
  place: '',
  image: null,
};

const CreatePostsScreen = ({ route }) => {
  const dispatch = useDispatch();

  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();

  const navigation = useNavigation();

  const [postState, setPostState] = useState(postInitialState);

  const { params } = route;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!params) {
      return;
    }
    if (!params.photo) {
      return;
    }

    console.log('params in create post: ', params);
    setPostState(prevState => ({
      ...prevState,
      image: params.photo,
      location: params.location,
    }));
  }, [route, route.params]);

  const { image, title, place } = postState;

  const handlePostAdd = async () => {
    if (image !== null && title !== null) {
      let location = await Location.getCurrentPositionAsync({});

      const { coords } = location;
      const { latitude, longitude } = coords;

      console.log('coords: ', coords);

      dispatch(
        addPost({
          ...postState,
          id: nanoid(),
          location: { latitude, longitude },
        })
      );
      setPostState(postInitialState);
      navigation.goBack();
      setKeyboardShown(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        keyboardShown && keyboardShownToggle();
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <View style={sharedStyles.innerContainer}>
          {!keyboardShown && (
            <ImageBox image={image} setPostState={setPostState} />
          )}
          <DescriptionTextInput
            marginTop={32}
            placeholder="Назва..."
            value={title}
            onFocus={() => {
              !keyboardShown && keyboardShownToggle();
            }}
            onChangeText={value => {
              setPostState(prevState => ({
                ...prevState,
                title: value,
              }));
            }}
            onSubmitEditing={keyboardShownToggle}
          />
          <DescriptionTextInput
            marginTop={16}
            icon={<Feather name="map-pin" size={18} color="#BDBDBD" />}
            placeholder="Місцевість..."
            value={place}
            onFocus={() => {
              !keyboardShown && keyboardShownToggle();
            }}
            onChangeText={value => {
              setPostState(prevState => ({
                ...prevState,
                place: value,
              }));
            }}
            onSubmitEditing={keyboardShownToggle}
          />
          <PrimaryBtn
            onPress={handlePostAdd}
            disabled={image && title && place ? false : true}
            label="Опублікувати"
            marginTop={32}
            marginBottom="auto"
          />
          <PrimaryIconBtn
            onPress={() => {
              setPostState(postInitialState);
            }}
            icon={<Feather name="trash-2" size={24} color="#BDBDBD" />}
            marginTop="auto"
            marginBottom={34}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
