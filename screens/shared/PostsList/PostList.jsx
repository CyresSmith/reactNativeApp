import { FlatList, View, Text } from 'react-native';

import Post from './Post/Post';
import Separator from '../Separator/Separator';

import { POSTS } from '../../../POSTS';

import { db } from '../../../firebase/config';
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from 'firebase/firestore';

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuth } from '../../../redux/selectors';

const EmptyList = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 360,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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
        Add Your firs post
      </Text>
    </View>
  );
};

const PostsList = ({
  HeaderComponent,
  HeaderStyle = {},
  FooterComponent = Separator,
  FooterStyle = {},
  navigation,
}) => {
  const listRef = useRef(null);
  const user = useSelector(getUserAuth);

  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const postsRef = collection(db, 'posts');

    const q = query(postsRef, where('userId', '==', user.uid));

    const userPosts = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const post = { id: doc.id, ...doc.data() };
      userPosts.push(post);
    });

    {
      userPosts !== [] && setPosts(userPosts);
    }
  };

  const updateAllPosts = async () => {
    const postsRef = collection(db, 'posts');

    const q = query(postsRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const post = { id: change.doc.id, ...change.doc.data() };
          setPosts(prevState => [...prevState, post]);
        }

        if (change.type === 'modified') {
          setPosts(prevState =>
            prevState.map(post => {
              if (post.id === change.doc.id) {
                return { ...post, ...change.doc.data };
              } else {
                return post;
              }
            })
          );
        }

        if (change.type === 'removed') {
          setPosts(prevState =>
            prevState.filter(post => post.id === change.doc.id)
          );
        }
      });
    });
  };

  useEffect(() => {
    if (posts === []) {
      getAllPosts();
    }

    updateAllPosts();
  }, []);

  return (
    <FlatList
      ref={listRef}
      ListHeaderComponent={HeaderComponent}
      ListHeaderComponentStyle={HeaderStyle}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={POSTS.length < 2 ? FooterComponent : Separator}
      ListEmptyComponent={EmptyList}
      data={posts}
      renderItem={({ item }) => <Post {...item} navigation={navigation} />}
      keyExtractor={item => item.id}
    />
  );
};

export default PostsList;
