import { ThemeBuilder } from '@wemogy/reactbase';
import { green, primary, red } from './Colors';

const DefaultTheme = ThemeBuilder.createTheme({
  referenceValueCollection: {
    designGridBase: 8,
    componentSize: {
      small: '1rem',
      medium: '2rem'
    },
    fontFamily: {
      default: 'Inter Variable',
      title: 'Roboto, sans-serif'
    },
    fontSize: {
      variation12: 12,
      variation14: 14,
      variation16: 16,
      default: 16,
      variation18: 18,
      variation20: 20,
      variation30: 30,
      variation60: 60
    },
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      default: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900
    },
    margin: {},
    padding: {},
    color: {
      primary: primary[500],
      primary100: primary[100],
      primary200: primary[200],
      primary300: primary[300],
      primary400: primary[400],
      primary500: primary[500],
      primary600: primary[600],
      primary700: primary[700],
      primary800: primary[800],
      primary900: primary[900],
      primaryDark: '#419DA8',
      primaryDisabled: '#96D8DC',
      white: '#fff',
      grey50: '#F9FAFB',
      grey100: '#F3F4F6',
      grey200: '#E5E7EB',
      grey300: '#D1D5DB',
      grey400: '#9CA3AF',
      grey500: '#6B7280',
      grey600: '#4B5563',
      grey700: '#374151',
      grey800: '#1F2937',
      grey900: '#111827',
      greyDark: '#1D2A3B',
      greyLight: '#EEF2FF',
      green100: green[100],
      green200: green[200],
      green300: green[300],
      green400: green[400],
      green500: green[500],
      green600: green[600],
      green700: green[700],
      green800: green[800],
      green900: green[900],
      black: '#000',
      red100: red[100],
      red200: red[200],
      red300: red[300],
      red400: red[400],
      red500: red[500],
      red600: red[600],
      red700: red[700],
      red800: red[800],
      red900: red[900],
      indigo100: '#DFF0F3',
      indigo900: '#312E81',
      transparent: 'transparent'
    },
    borderSize: {},
    borderRadiusSize: {
      medium: 8
    }
  }
});

export default DefaultTheme;
