import { View, TextInput, TouchableOpacity } from 'react-native';

const moment = require('moment');

import { useState } from 'react';

import { Feather } from '@expo/vector-icons';

import styles from './CommentInputStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../redux/selectors';
import { addCommentToPost } from '../../../../redux/authSlice';
import useKeyboardShownToggle from '../../../shared/Utils/useKeyboardShownToggle';

const postInitialState = {
  text: null,
  userId: null,
  date: null,
};

const CommentInput = ({ id }) => {
  const dispatch = useDispatch();
  const [postState, setPostState] = useState(postInitialState);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();

  const { userId } = useSelector(getUser);

  const onAddCommentBtnPress = () => {
    if (!postState.text) {
      return;
    }
    dispatch(
      addCommentToPost({
        id,
        comment: { ...postState, date: new Date().toISOString(), userId },
      })
    );
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
