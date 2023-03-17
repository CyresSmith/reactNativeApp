import { View, Image, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import GetPhotoBtn from '../getPhotoBtn/getPhotoBtn';

import usePickImage from '../../../../shared/Utils/usePickImage';

import styles from './ImageBoxStyles';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const ImageBox = ({ image = null, setPostState }) => {
  const [imageState, setImageState] = useState();

  const [imageFromGallery = null, setImageFromGallery, pickImageFromGallery] =
    usePickImage({
      allowsEditing: true,
    });

  const navigation = useNavigation();

  const pickImageFromCamera = () => {
    navigation.navigate('Камера');
  };

  useEffect(() => {
    if (!image) {
      return;
    }
    setImageState(image);
  }, [image]);

  useEffect(() => {
    if (!imageFromGallery) {
      return;
    }
    setPostState(prevState => ({ ...prevState, image: imageFromGallery }));
  }, [imageFromGallery]);

  return (
    <>
      <View>
        <View
          style={{
            ...styles.img,
            backgroundColor: image ? 'black' : 'lightgray',
          }}
        >
          {image ? (
            <Image
              style={{
                flex: 1,
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />
          ) : (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={styles.selectSource}>
                <GetPhotoBtn
                  icon={<FontAwesome name="camera" size={24} color="white" />}
                  // text={'Take a photo'}
                  onPress={pickImageFromCamera}
                />
              </View>
              <View style={styles.selectSource}>
                <GetPhotoBtn
                  icon={
                    <FontAwesome name="folder-open" size={24} color="white" />
                  }
                  // text={'Choose from gallery'}
                  onPress={pickImageFromGallery}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.editPhoto}>
        {image ? 'Редагувати фото' : 'Заватнажити фото'}
      </Text>
    </>
  );
};

export default ImageBox;
