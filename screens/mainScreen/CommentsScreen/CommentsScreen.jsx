import { Text, View, Image, FlatList } from 'react-native';

import styles from './CommentsScreenStyles';

import Comment from './Comment/Comment';
import CommentInput from './CommentInput/CommentInput';
import { useRef } from 'react';
import { useState } from 'react';

import { doc, onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';

import { useEffect } from 'react';

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

const CommentsScreen = ({ route }) => {
  const listRef = useRef();
  const { imageUrl, id } = route.params;
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    await onSnapshot(doc(db, 'posts', `${id}`), doc => {
      setComments(doc.data().comments);
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    if (comments !== []) {
      getComments();
    }
  }, []);

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
        ListHeaderComponent={Header(imageUrl)}
        ListHeaderComponentStyle={{ paddingBottom: 32, paddingTop: 32 }}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={Separator}
        ListFooterComponentStyle={{ paddingTop: 32, paddingBottom: 16 }}
        ListEmptyComponent={NoComments}
        data={comments}
        renderItem={({ item }) => <Comment {...item} />}
        keyExtractor={item => item.id}
      />
      <CommentInput id={id} />
    </View>
  );
};

export default CommentsScreen;
