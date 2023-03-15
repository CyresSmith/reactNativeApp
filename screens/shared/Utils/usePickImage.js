import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const usePickImage = ({ allowsEditing = false, aspect = null }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const options = (allowsEditing = false, aspect = null) => {
      if (aspect) {
        return {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing,
          aspect,
          quality: 1,
        };
      } else {
        return {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing,
          quality: 1,
        };
      }
    };

    let result = await ImagePicker.launchImageLibraryAsync(
      options(allowsEditing, aspect)
    );

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return [image, setImage, pickImage];
};

export default usePickImage;
