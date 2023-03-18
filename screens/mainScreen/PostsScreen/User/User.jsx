import { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserAuth } from '../../../../redux/selectors';

import userStyles from './UserStyles';

const User = () => {
  const user = useSelector(getUserAuth);
  const [image, setImage] = useState();

  const { displayName, email, photoURL } = user;

  useEffect(() => {
    setImage(user.photoURL);
  }, [user, user.photoURL]);

  return (
    <View style={{ ...userStyles.box, marginLeft: 16 }}>
      <View style={userStyles.avatar}>
        {image && <Image style={{ flex: 1 }} source={{ uri: image }} />}
      </View>
      <View style={{ marginLeft: 8 }}>
        <Text style={userStyles.userName}>{displayName}</Text>
        <Text style={userStyles.userMail}>{email}</Text>
      </View>
    </View>
  );
};

export default User;
