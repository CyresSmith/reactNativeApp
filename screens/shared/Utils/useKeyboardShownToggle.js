import { useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardShownToggle = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);

  const keyboardShownToggle = () => {
    setKeyboardShown(prevState => {
      if (prevState === true) {
        Keyboard.dismiss();
        return !prevState;
      }

      return !prevState;
    });
  };

  return [keyboardShown, setKeyboardShown, keyboardShownToggle];
};

export default useKeyboardShownToggle;
