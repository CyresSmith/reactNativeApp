import { Text, View, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

import Avatar from '../../shared/Avatar/Avatar';
import PostsList from '../../shared/PostsList/PostList';

import styles from './ProfileScreenStyles';
import sharedStyles from '../../shared/sharedStyles';
import { LogoutBtn } from '../../shared/SharedBtns';

import { useSelector } from 'react-redux';
import { getUserAuth } from '../../../redux/selectors';

const ListHeader = () => {
  const user = useSelector(getUserAuth);
  const { displayName } = user;

  return (
    <View style={styles.listHeaderBox}>
      <View style={{ alignItems: 'center', paddingBottom: 32 }}>
        <Avatar />
        <Text style={sharedStyles.authTitle}>{displayName}</Text>
      </View>

      <View style={styles.logoutBtnBox}>
        <LogoutBtn />
      </View>
    </View>
  );
};

const ListFooter = () => {
  return (
    <View style={{ flex: 1, height: 91.5, backgroundColor: 'white' }}></View>
  );
};

export default function RegistrationScreen({ navigation }) {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
    };

    Dimensions.addEventListener('change', onChange);

    // return () => {
    //   Dimensions.removeEventListener('change', onChange);
    // };
  }, []);

  return (
    <View style={sharedStyles.container}>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        source={require('../../../assets/images/sergio-souza.jpg')}
      >
        <PostsList HeaderComponent={ListHeader} FooterComponent={ListFooter} />
      </ImageBackground>
    </View>
  );
}
