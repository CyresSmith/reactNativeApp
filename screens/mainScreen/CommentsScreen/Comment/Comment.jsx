import { Text, View, Image } from 'react-native';

const moment = require('moment');
import 'moment/locale/uk';

import { FontAwesome } from '@expo/vector-icons';

import styles from './CommentStyles';
import { useSelector } from 'react-redux';
import { getUserAuth } from '../../../../redux/selectors';

const Comment = ({ text, date, uid, displayName }) => {
  const normDate = moment(date).locale('uk').format('DD MMMM YYYY | HH:mm');

  const user = useSelector(getUserAuth);

  const currentUser = user.uid === uid;

  return (
    <View
      style={{
        ...styles.box,
        transform: currentUser ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
      }}
    >
      <View
        style={{
          ...styles.userImg,
          transform: currentUser ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
        }}
      >
        {user.photoURL && currentUser ? (
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: user.photoURL }}
          />
        ) : (
          <FontAwesome name="user-secret" size={22} color="black" />
        )}
      </View>
      <View style={styles.commentBox}>
        <Text
          style={{
            ...styles.commentText,
            transform: currentUser ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
          }}
        >
          {text}
        </Text>
        <Text
          style={{
            ...styles.commentDate,
            textAlign: currentUser ? 'left' : 'right',
            transform: currentUser ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
          }}
        >
          {normDate}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
