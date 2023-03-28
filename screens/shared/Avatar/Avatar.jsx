import { View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import styles from './AvatarStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuth } from '../../../redux/selectors';

import { auth } from '../../../firebase/config';
import { updateProfile } from 'firebase/auth';

import { storage, db } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateUserProfile } from '../../../redux/auth';

export default function Avatar() {
  const user = useSelector(getUserAuth);

  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const uploadPhotoToServer = async image => {
    const response = await fetch(image);
    const file = await response.blob();

    const storageRef = ref(storage, `userImages/${user.uid}`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(ref(storage, `userImages/${user.uid}`));

    return url;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const img = result.assets[0].uri;

    if (!result.canceled) {
      const photoURL = await uploadPhotoToServer(img);

      const user = auth.currentUser;

      await updateProfile(user, { photoURL });

      dispatch(updateUserProfile({ photoURL }));
    }
  };

  useEffect(() => {
    setImage(user.photoURL);
  }, [user, user.photoURL]);

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
