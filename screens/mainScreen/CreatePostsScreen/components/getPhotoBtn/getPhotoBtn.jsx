import { Text, TouchableOpacity, View } from 'react-native';
import styles from './getPhotoBtnStyles';

const GetPhotoBtn = ({ icon, text = null, onPress }) => {
  return (
    <TouchableOpacity style={styles.getPhotoBtn} onPress={onPress}>
      <View style={styles.iconBox} activeOpacity={0.75}>
        {icon}
      </View>
      {text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default GetPhotoBtn;
