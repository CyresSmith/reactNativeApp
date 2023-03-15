import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';
import { getPostId, getPosts, getUser } from '../../../redux/selectors';

import { Feather } from '@expo/vector-icons';

import styles from './CommentsScreenStyles';

import Comment from './Comment/Comment';

import comments from './comments';

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
    <View style={styles.noComments}>
      <Text>No comments yet</Text>
    </View>
  );
};

const Footer = () => {
  return (
    <View style={{ position: 'relative' }}>
      <TextInput
        placeholder="Коментувати..."
        style={styles.footer.input}
      ></TextInput>
      <TouchableOpacity style={styles.footer.btn}>
        <Feather name="arrow-up" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const CommentsScreen = () => {
  const id = useSelector(getPostId);
  const posts = useSelector(getPosts);
  const post = posts.find(item => item.id === id);
  const user = useSelector(getUser);

  const { image, likes, place, title } = post;

  return (
    <FlatList
      style={{
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
      ListHeaderComponent={Header(image)}
      ListHeaderComponentStyle={{ paddingBottom: 32, paddingTop: 32 }}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Footer}
      ListFooterComponentStyle={{ paddingTop: 32, paddingBottom: 16 }}
      ListEmptyComponent={NoComments}
      data={comments}
      renderItem={({ item }) => <Comment {...item} userImg={user.avatar} />}
      keyExtractor={item => item.id}
    />
  );
};

export default CommentsScreen;
