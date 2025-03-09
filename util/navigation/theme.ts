import { DarkTheme, Theme } from '@react-navigation/native';

const theme:Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary:'#fb6'
  },
};

export default theme;
