import { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getAuth, getUser } from '../../../../redux/selectors';

import userStyles from './UserStyles';

const User = () => {
  const user = useSelector(getUser);
  const [image, setImage] = useState();

  useEffect(() => {
    if (user === null) {
      return;
    }
    setImage(user.avatar);
  }, [user]);

  return (
    <View style={{ ...userStyles.box, marginLeft: 16 }}>
      <View style={userStyles.avatar}>
        {image && <Image style={{ flex: 1 }} source={{ uri: image }} />}
      </View>
      <View style={{ marginLeft: 8 }}>
        <Text style={userStyles.userName}>{user?.login}</Text>
        <Text style={userStyles.userMail}>{user?.email}</Text>
      </View>
    </View>
  );
};

export default User;
