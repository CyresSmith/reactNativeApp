import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import * as Location from 'expo-location';

import { storage, db } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

import { Feather } from '@expo/vector-icons';

import useKeyboardShownToggle from '../../shared/Utils/useKeyboardShownToggle';

import sharedStyles from '../../shared/sharedStyles';
import { PrimaryBtn, PrimaryIconBtn } from '../../shared/SharedBtns';
import DescriptionTextInput from './components/DecriptionTextInput/DecriptionTextInput';
import ImageBox from './components/ImageBox/ImageBox';
import { getUserAuth } from '../../../redux/selectors';

const postInitialState = {
  title: '',
  place: '',
  image: null,
  imageUrl: null,
  comments: [],
  likes: [],
};

const CreatePostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();

  const [postState, setPostState] = useState(postInitialState);
  const [loading, setLoading] = useState(false);
  const { params } = route;

  const user = useSelector(getUserAuth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (!params) {
      return;
    }
    if (!params.photo) {
      return;
    }
    setPostState(prevState => ({
      ...prevState,
      image: params.photo,
    }));
  }, [route, route.params]);

  const uploadPhotoToServer = async image => {
    try {
      const response = await fetch(image);
      const file = await response.blob();
      const postId = nanoid();

      const storageRef = ref(storage, `postsImages/${postId}`);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(ref(storage, `postsImages/${postId}`));

      return url;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const { image, title, place } = postState;

  const handlePostAdd = async () => {
    if (image !== null && title !== null) {
      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});

      const { coords } = location;

      const url = await uploadPhotoToServer(postState.image);

      await addDoc(collection(db, 'posts'), {
        ...postState,
        location: coords,
        imageUrl: url,
        userId: user.uid,
        username: user.displayName,
      });

      setPostState(postInitialState);
      setKeyboardShown(false);
      setLoading(false);
      navigation.goBack();
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
            disabled={!loading && image && title && place ? false : true}
            label="Опублікувати"
            marginTop={32}
            marginBottom="auto"
            loading={loading}
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
