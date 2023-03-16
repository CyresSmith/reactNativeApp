import { Text, View, Image, FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import { getPostId, getPosts, getUser } from '../../../redux/selectors';

import styles from './CommentsScreenStyles';

import Comment from './Comment/Comment';
import CommentInput from './CommentInput/CommentInput';
import { useEffect, useRef } from 'react';

const Header = image => {
  return (
    <View style={styles.header}>
      <Image style={{ flex: 1 }} source={{ uri: image }} />
    </View>
  );
};

const Separator = () => {
  return <View style={{ flex: 1, height: 24 }}></View>;
};

const NoComments = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
      }}
    >
      <Text
        style={{
          fontFamily: 'SofiaSansMedium',
          fontSize: 20,
          lineHeight: 23,
          color: '#BDBDBD',
        }}
      >
        No comments yet
      </Text>
    </View>
  );
};

const CommentsScreen = () => {
  const id = useSelector(getPostId);
  const posts = useSelector(getPosts);
  const post = posts.find(item => item.id === id);

  const { image, comments, likes, place, title } = post;

  const newComments = () => {
    if (comments.length === 0) {
      return comments;
    }

    return [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolorem doloremque, eum nulla expedita rem dolorum.',
        date: new Date().toISOString(),
        userId: 1,
      },
      ...comments,
    ];
  };

  const testComments = newComments();

  const listRef = useRef();

  useEffect(() => {
    listRef.current.scrollToEnd({ animated: true });
  }, [comments]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={listRef}
        style={{
          paddingHorizontal: 16,
          backgroundColor: 'white',
        }}
        ListHeaderComponent={Header(image)}
        ListHeaderComponentStyle={{ paddingBottom: 32, paddingTop: 32 }}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={Separator}
        ListFooterComponentStyle={{ paddingTop: 32, paddingBottom: 16 }}
        ListEmptyComponent={NoComments}
        data={testComments}
        renderItem={({ item }) => <Comment {...item} />}
        keyExtractor={item => item.id}
      />
      <CommentInput id={id} />
    </View>
  );
};

export default CommentsScreen;
