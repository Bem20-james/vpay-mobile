/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'; // Original tint color
const tintColorDark = '#fff'; // Original tint color

// New primary color and its shades based on #208BC9
const primaryLight = '#208BC9';
const primaryDark1 = '#14547C';
const primaryDark2 = '#0A2D4A';
const primaryDark3 = '#041723';
const accent = '#80D1FF'
const extras = '#161622'

export const Colors = {
  light: {
    text: '#11181C',
    textGray: '#9B9B9B',
    background: '#EEF3FB',
    accentBg: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: primaryLight,
    primaryDark1: primaryDark1,
    primaryDark2: primaryDark2,
    primaryDark3: primaryDark3,
    white: '#ffffff',
    darkGray: '#1A1A1A',
    lightGray: '#F5F5F5',
  },
  dark: {
    text: '#ECEDEE',
    accentBg: primaryDark3,
    background: '#000000',
    primaryBgDark: '#020B0F',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: primaryLight,
    primaryDark1: primaryDark1,
    primaryDark2: primaryDark2,
    primaryDark3: primaryDark3,
    black: '#000000',
    darkGray: '#1A1A1A',
    lightGray: '#B0B0B0',
  },
};