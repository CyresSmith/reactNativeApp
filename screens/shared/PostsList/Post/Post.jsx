import { Text, View, Image, TouchableOpacity } from 'react-native';

import { useState } from 'react';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import postStyles from './PostStyles';
import { useDispatch } from 'react-redux';
import { setPostId } from '../../../../redux/postIdSlise';
import { editPost } from '../../../../redux/postsSlice';
import { useEffect } from 'react';

const Post = ({ id, title, comments, likes, place, image, navigation }) => {
  const dispatch = useDispatch();

  const [thisPostId, setThisPostId] = useState();

  console.log('postId: ', id);

  useEffect(() => {
    if (!id) {
      return;
    }
    setThisPostId(id);
  }, []);

  const onCommentsBtnPress = () => {
    dispatch(setPostId(thisPostId));
    navigation.navigate('Коментарі');
  };

  const onLikeBtnPress = () => {
    // console.log(thisPostId);
    dispatch(
      editPost({
        id: thisPostId,
        likes: likes + 1,
      })
    );
  };

  return (
    <TouchableOpacity onPress={onCommentsBtnPress}>
      <View style={postStyles.box}>
        <View style={postStyles.img}>
          {image !== '' && (
            <Image
              style={{ flex: 1, width: '100%', height: '100%' }}
              source={{ uri: image }}
            />
          )}
        </View>
        <View style={postStyles.captionBox}>
          <Text style={postStyles.caption}>{title}</Text>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginTop: 11 }}
          >
            <View style={postStyles.commentCountBox}>
              <View style={{ transform: [{ scaleX: -1 }] }}>
                {comments.length === 0 ? (
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
                {comments.length}
              </Text>
            </View>

            <TouchableOpacity
              style={{ ...postStyles.commentCountBox, marginLeft: 24 }}
              onPress={onLikeBtnPress}
            >
              <View>
                {likes === 0 ? (
                  <FontAwesome name="thumbs-o-up" size={18} color="#BDBDBD" />
                ) : (
                  <FontAwesome name="thumbs-up" size={18} color="#FF6C00" />
                )}
              </View>
              <Text
                style={{
                  ...postStyles.commentCount,
                  color: likes === 0 ? '#BDBDBD' : '#FF6C00',
                }}
              >
                {likes}
              </Text>
            </TouchableOpacity>

            <View style={postStyles.commentPlaceBox}>
              <View>
                <Feather name="map-pin" size={18} color="#BDBDBD" />
              </View>
              <Text style={postStyles.place}>{place}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Post;
