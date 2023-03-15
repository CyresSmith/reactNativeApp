import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostsScreen from '../PostsScreen';
import CommentsScreen from '../../CommentsScreen/CommentsScreen';

const PostsStack = createNativeStackNavigator();

import { LogoutBtn } from '../../../shared/SharedBtns';

const PostsScreenStack = () => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        options={{
          headerShown: true,
          headerRight: props => <LogoutBtn {...props} />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <PostsStack.Screen
        options={{
          headerShown: true,
        }}
        name="Коментарі"
        component={CommentsScreen}
      />
    </PostsStack.Navigator>
  );
};

export default PostsScreenStack;
