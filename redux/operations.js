import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase/config';
import { updateUserProfile, logOutUser } from './auth';

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, { displayName: nickname });

        const { displayName, uid } = user;

        dispatch(updateUserProfile({ uid, displayName }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log('error message: ', error.message);
    }
  };

export const authStateChanged = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, user => {
      if (!user) {
        console.log('no user');
        return;
      }
      const { uid, displayName, email, photoURL } = user;
      dispatch(
        updateUserProfile({
          uid,
          displayName,
          email,
          photoURL,
          authState: true,
        })
      );
    });
  } catch (error) {
    console.log('error message: ', error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(logOutUser());
  } catch (error) {
    console.log('error message: ', error.message);
  }
};
