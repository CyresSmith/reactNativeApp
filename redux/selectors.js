export const getAuth = state => state.userAuth.auth;
export const getUser = state => state.userAuth.user;
export const getPosts = state => state.userAuth.user.posts;

export const getAuthState = state => state.auth.authState;
export const getUserAuth = state => state.auth;
