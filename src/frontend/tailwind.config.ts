import {nextui} from '@nextui-org/react';
import {type Config} from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [nextui()],
  darkMode: 'class'
} as Config;
