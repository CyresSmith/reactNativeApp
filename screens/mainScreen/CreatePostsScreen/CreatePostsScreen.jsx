import {
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import useKeyboardShownToggle from '../../shared/Utils/useKeyboardShownToggle';
import usePickImage from '../../shared/Utils/usePickImage';

import { addPost } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';

import styles from './CreatePostsScreenStyles';
import sharedStyles from '../../shared/sharedStyles';

const postInitialState = {
  likes: 0,
  comments: [],
  title: '',
  place: '',
};

const CreatePostsScreen = ({}) => {
  const dispatch = useDispatch();

  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();
  const navigation = useNavigation();
  const [post, setPost] = useState(postInitialState);
  const [image, setImage, pickImage] = usePickImage({
    allowsEditing: true,
  });

  useEffect(() => {
    if (image === null) {
      return;
    }
    setPost(prevState => ({ ...prevState, image, id: nanoid() }));
  }, [image]);

  const handlePostAdd = () => {
    if (image !== null && post.title !== null) {
      dispatch(addPost(post));
      setPost(postInitialState);
      setImage(null);
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
            <>
              <TouchableOpacity activeOpacity={0.75} onPress={pickImage}>
                <View style={styles.img}>
                  {image ? (
                    <Image
                      style={{ flex: 1, width: '100%', height: '100%' }}
                      source={{ uri: image }}
                    />
                  ) : (
                    <View style={styles.addBtn} activeOpacity={0.75}>
                      <FontAwesome name="camera" size={24} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.editPhoto}>
                {image ? 'Редагувати фото' : 'Заватнажити фото'}
              </Text>
            </>
          )}
          <TextInput
            style={{ ...styles.textInput, marginTop: 32 }}
            placeholder="Назва..."
            onFocus={() => {
              !keyboardShown && keyboardShownToggle();
            }}
            value={post.title}
            onChangeText={value => {
              setPost(prevState => ({
                ...prevState,
                title: value,
              }));
            }}
            onSubmitEditing={keyboardShownToggle}
          />
          <View
            style={{
              position: 'relative',
              marginTop: 16,
            }}
          >
            <View style={styles.textInputIcon}>
              <Feather name="map-pin" size={18} color="#BDBDBD" />
            </View>
            <TextInput
              style={{ ...styles.textInput, paddingLeft: 28 }}
              placeholder="Місцевість..."
              onFocus={() => {
                !keyboardShown && keyboardShownToggle();
              }}
              value={post.place}
              onChangeText={value => {
                setPost(prevState => ({
                  ...prevState,
                  place: value,
                }));
              }}
              onSubmitEditing={keyboardShownToggle}
            />
          </View>

          <TouchableOpacity
            style={{
              ...sharedStyles.authBtn,
              marginTop: 32,
              marginBottom: 'auto',
              backgroundColor: image ? '#FF6C00' : '#F6F6F6',
            }}
            activeOpacity={0.75}
            onPress={handlePostAdd}
          >
            <Text
              style={{
                ...sharedStyles.authBtnText,
                color: image ? '#ffffff' : '#BDBDBD',
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deletBtn} activeOpacity={0.75}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
