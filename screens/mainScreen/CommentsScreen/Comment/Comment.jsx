import { Text, View, Image } from 'react-native';

const moment = require('moment');
import 'moment/locale/uk';

import { FontAwesome } from '@expo/vector-icons';

import styles from './CommentStyles';

const Comment = ({ text, date, author, userImg }) => {
  const normDate = moment(date).locale('uk').format('DD MMMM YYYY | HH:mm');

  return (
    <View
      style={{
        ...styles.box,
        transform: author === 'Me' ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
      }}
    >
      <View
        style={{
          ...styles.userImg,
          transform: author === 'Me' ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
        }}
      >
        {author === 'Me' ? (
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: userImg }}
          />
        ) : (
          <FontAwesome name="user-secret" size={22} color="black" />
        )}
      </View>
      <View style={styles.commentBox}>
        <Text
          style={{
            ...styles.commentText,
            transform: author === 'Me' ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
          }}
        >
          {text}
        </Text>
        <Text
          style={{
            ...styles.commentDate,
            transform: author === 'Me' ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
          }}
        >
          {normDate}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
