import { useState } from 'react';
import { View, TextInput } from 'react-native';

import styles from './DecriptionTextInputStyles';

const DescriptionTextInput = ({
  marginTop,
  icon,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChangeText,
  onSubmitEditing,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        position: 'relative',
        marginTop: marginTop,
      }}
    >
      {icon && <View style={styles.textInputIcon}>{icon}</View>}
      <TextInput
        style={{
          ...styles.textInput,
          paddingLeft: icon ? 28 : 0,
          borderBottomColor: isFocused ? '#FF6C00' : '#E8E8E8',
        }}
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default DescriptionTextInput;
