// @flow
import { DefaultTheme } from 'react-native-paper';

function getTheme(lang: string) {
  const fontFamily = lang === 'en' ? 'Rajdhani' : 'Amiri';
  return {
    ...DefaultTheme,
    roundness: 6,
    colors: {
      ...DefaultTheme.colors,
      primary: '#B9994E',
    },
    fonts: {
      regular: `${fontFamily}-Bold`,
      medium: lang === 'en' ? 'Rajdhani-SemiBold' : 'Amiri-Bold',
      light: lang === 'en' ? 'Rajdhani-Medium' : 'Amiri-Regular',
      thin: lang === 'en' ? 'Rajdhani-Light' : 'Amiri-Regular',
    },
  };
}

export { getTheme };
