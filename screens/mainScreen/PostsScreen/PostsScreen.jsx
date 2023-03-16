import { View } from 'react-native';

import User from './User/User';
import PostsList from '../../shared/PostsList/PostList';

import styles from './PostsScreenStyles';
import sharedStyles from '../../shared/sharedStyles';

const PostsScreen = () => {
  return (
    <View style={sharedStyles.container}>
      <PostsList
        HeaderComponent={User}
        HeaderStyle={{ paddingTop: 32, paddingBottom: 32 }}
      />
    </View>
  );
};

export default PostsScreen;
