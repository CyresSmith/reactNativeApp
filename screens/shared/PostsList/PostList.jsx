import { FlatList, View, Text } from 'react-native';

import Post from './Post/Post';
import Separator from '../Separator/Separator';

import { useSelector } from 'react-redux';
import { getPosts } from '../../../redux/selectors';

import { POSTS } from '../../../POSTS';
import { useRef } from 'react';

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
  const posts = useSelector(getPosts);
  const listRef = useRef(null);
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
