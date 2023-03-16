import { Text, View, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import postStyles from './PostStyles';
import { setPostId } from '../../../../redux/postIdSlise';
import { addLikeToPost } from '../../../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../../../redux/selectors';

const Post = ({ id, title, comments, likes, place, image }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userId } = useSelector(getUser);

  const onCommentsBtnPress = () => {
    dispatch(setPostId(id));
    navigation.navigate('Коментарі');
  };

  const onPlaceBtnPress = () => {
    dispatch(setPostId(id));
    navigation.navigate('Місце');
  };

  const onLikeBtnPress = () => {
    dispatch(
      addLikeToPost({
        id,
        userId,
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
    </TouchableOpacity>
  );
};

export default Post;
