import { View, TextInput, TouchableOpacity } from 'react-native';

import { useState } from 'react';

import { Feather } from '@expo/vector-icons';

import styles from './CommentInputStyle';
import { useSelector } from 'react-redux';
import { getUserAuth } from '../../../../redux/selectors';
import useKeyboardShownToggle from '../../../shared/Utils/useKeyboardShownToggle';

import { nanoid } from 'nanoid';

import { db } from '../../../../firebase/config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const postInitialState = {
  text: null,
};

const CommentInput = ({ id }) => {
  const [postState, setPostState] = useState(postInitialState);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();

  const { displayName, uid } = useSelector(getUserAuth);

  const createComment = async () => {
    const comment = {
      ...postState,
      displayName,
      date: new Date().toISOString(),
      id: nanoid(),
      uid,
    };

    const postsRef = doc(db, 'posts', `${id}`);

    await updateDoc(postsRef, {
      comments: arrayUnion(comment),
    });
  };

  const onAddCommentBtnPress = () => {
    if (!postState.text) {
      return;
    }
    createComment();
    setPostState(postInitialState);
    keyboardShownToggle();
  };

  return (
    <View style={styles.commentInputBox}>
      <TextInput
        style={{
          ...styles.input,
          borderColor: isInputFocused ? '#FF6C00' : '#E8E8E8',
        }}
        placeholder="Коментувати..."
        placeholderTextColor={'#BDBDBD'}
        inputmode={'text'}
        keyboardType={'text'}
        value={postState.text}
        onFocus={() => {
          setIsInputFocused(prevState => !prevState);
          !keyboardShown && keyboardShownToggle();
        }}
        onBlur={() => {
          setIsInputFocused(prevState => !prevState);
          !keyboardShown && keyboardShownToggle();
        }}
        onChangeText={value => {
          setPostState(prevState => ({
            ...prevState,
            text: value,
          }));
        }}
        // onSubmitEditing={onAddCommentBtnPress}
      />
      <TouchableOpacity
        style={{
          ...styles.btn,
          backgroundColor: postState.text ? '#FF6C00' : '#BDBDBD',
        }}
        onPress={onAddCommentBtnPress}
      >
        <Feather name="arrow-up" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
