import { Text, View, Image } from 'react-native';

const moment = require('moment');
import 'moment/locale/uk';

import { FontAwesome } from '@expo/vector-icons';

import styles from './CommentStyles';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../redux/selectors';

const Comment = ({ text, date, userId }) => {
  const normDate = moment(date).locale('uk').format('DD MMMM YYYY | HH:mm');

  const { userId: currentUserId, avatar } = useSelector(getUser);

  const currentUser = currentUserId === userId;
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
        {avatar && currentUser ? (
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: avatar }}
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
