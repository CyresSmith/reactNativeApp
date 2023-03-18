import { Text, View, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import postStyles from './PostStyles';
import { useState, useEffect } from 'react';
import { db } from '../../../../firebase/config';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';

const Post = ({ id, userId, title, comments, place, imageUrl, location }) => {
  const navigation = useNavigation();

  const [likes = [], setLikes] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const getLikes = async () => {
    await onSnapshot(doc(db, 'posts', `${id}`), doc => {
      setLikes(doc.data().likes);
    });
  };

  const getCommentsCount = async () => {
    await onSnapshot(doc(db, 'posts', `${id}`), doc => {
      setCommentsCount(doc.data().comments.length);
    });
  };

  const addLike = async () => {
    const postsRef = doc(db, 'posts', `${id}`);

    await updateDoc(postsRef, {
      likes: arrayUnion(userId),
    });
  };

  const removeLike = async () => {
    const postsRef = doc(db, 'posts', `${id}`);

    await updateDoc(postsRef, {
      likes: arrayRemove(userId),
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getLikes();
    getCommentsCount();
  }, []);

  const onCommentsBtnPress = () => {
    navigation.navigate('Коментарі', { comments, imageUrl, id });
  };

  const onPlaceBtnPress = () => {
    navigation.navigate('Місце', { location });
  };

  const onLikeBtnPress = () => {
    switch (likes.includes(userId)) {
      case false:
        addLike();
        break;

      case true:
        removeLike();
        break;

      default:
        break;
    }
  };

  return (
    <View style={postStyles.box}>
      <View
        style={{
          ...postStyles.img,
          backgroundColor: imageUrl ? 'black' : 'lightgray',
        }}
      >
        {imageUrl !== '' && (
          <Image
            style={{
              flex: 1,
              width: 'auto',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={{ uri: imageUrl }}
          />
        )}
      </View>
      <View style={postStyles.captionBox}>
        <Text style={postStyles.caption}>{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 11 }}>
          <TouchableOpacity onPress={onCommentsBtnPress}>
            <View style={postStyles.commentCountBox}>
              <View style={{ transform: [{ scaleX: -1 }] }}>
                {commentsCount === 0 ? (
                  <Feather name="message-square" size={18} color="#BDBDBD" />
                ) : (
                  <MaterialCommunityIcons
                    name="message"
                    size={18}
                    color="#FF6C00"
                  />
                )}
              </View>
              <Text
                style={{
                  ...postStyles.commentCount,
                  color: comments.length === 0 ? '#BDBDBD' : '#FF6C00',
                }}
              >
                {commentsCount}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...postStyles.commentCountBox, marginLeft: 24 }}
            onPress={onLikeBtnPress}
          >
            <View>
              {!likes.length ? (
                <FontAwesome name="thumbs-o-up" size={18} color="#BDBDBD" />
              ) : (
                <FontAwesome name="thumbs-up" size={18} color="#FF6C00" />
              )}
            </View>
            <Text
              style={{
                ...postStyles.commentCount,
                color: !likes.length ? '#BDBDBD' : '#FF6C00',
              }}
            >
              {likes.length ? likes.length : 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPlaceBtnPress}
            style={postStyles.commentPlaceBox}
          >
            <View>
              <Feather name="map-pin" size={18} color="#BDBDBD" />
            </View>
            <Text style={postStyles.place}>{place}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;
