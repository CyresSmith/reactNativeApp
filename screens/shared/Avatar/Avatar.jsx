import { View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import styles from './AvatarStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/authSlice';
import { getUser } from '../../../redux/selectors';

export default function Avatar() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user.avatar === null) {
      return;
    }
    setImage(user.avatar);
  }, [dispatch, user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const img = result.assets[0].uri;

    if (!result.canceled) {
      dispatch(setUser({ avatar: img }));
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <View style={styles.avatarBackground}>
        {image && <Image style={styles.avatar} source={{ uri: image }} />}
      </View>
      <TouchableOpacity
        style={{
          ...styles.avatarAdd,
          borderColor: image ? '#E8E8E8' : '#FF6C00',
        }}
        onPress={() => pickImage()}
      >
        <View
          style={{
            transform: [{ rotate: image ? '45deg' : '0deg' }],
          }}
        >
          <Feather
            name="plus"
            size={18}
            color={image ? '#E8E8E8' : '#FF6C00'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
