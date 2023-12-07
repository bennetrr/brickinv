import { Text as TextBase } from '@wemogy/reactbase';

const Text = TextBase.extendVariations({
  base: {
    fontFamily: 'default',
    textSelectable: false
  },
  cta: {
    fontColor: 'primary',
    fontSize: 'variation14'
  },
  variation12Grey500Medium: {
    fontSize: 'variation12',
    fontColor: 'grey500',
    fontWeight: 'medium'
  },
  variation12Grey500MediumUppercase: {
    fontSize: 'variation12',
    fontColor: 'grey500',
    fontWeight: 'medium',
    textTransform: 'uppercase'
  },
  variation14Gray500: {
    fontSize: 'variation14',
    fontColor: 'grey500'
  },
  variation14Gray500Medium: {
    fontSize: 'variation14',
    fontColor: 'grey500',
    fontWeight: 'medium'
  },
  variation14Primary: {
    fontSize: 'variation14',
    fontColor: 'primary'
  },
  variation14PrimaryMedium: {
    fontSize: 'variation14',
    fontColor: 'primary',
    fontWeight: 'medium'
  },
  variation14PrimaryDarkMedium: {
    fontSize: 'variation14',
    fontColor: 'primaryDark',
    fontWeight: 'medium'
  },
  variation14Indigo900Medium: {
    fontSize: 'variation14',
    fontColor: 'indigo900',
    fontWeight: 'medium'
  },
  variation14WhiteMedium: {
    fontSize: 'variation14',
    fontColor: 'white',
    fontWeight: 'medium'
  },
  variation14Gray600: {
    fontSize: 'variation14',
    fontColor: 'grey600'
  },
  variation14Gray900: {
    fontSize: 'variation14',
    fontColor: 'grey900'
  },
  variation14Gray900Medium: {
    fontSize: 'variation14',
    fontWeight: 'medium',
    fontColor: 'grey900'
  },
  variation14Red500Medium: {
    fontSize: 'variation14',
    fontWeight: 'medium',
    fontColor: 'red500'
  },
  variation14Green500Medium: {
    fontSize: 'variation14',
    fontWeight: 'medium',
    fontColor: 'green500'
  },
  variation14Grey500: {
    fontSize: 'variation14',
    fontColor: 'grey500'
  },
  variation14Grey700: {
    fontSize: 'variation14',
    fontColor: 'grey700'
  },
  variation14Grey700Medium: {
    fontSize: 'variation14',
    fontWeight: 'medium',
    fontColor: 'grey700'
  },
  variation14Grey800Medium: {
    fontSize: 'variation14',
    fontWeight: 'medium',
    fontColor: 'grey800'
  },
  variation16Gray600Medium: {
    fontSize: 'variation16',
    fontWeight: 'medium',
    fontColor: 'grey600'
  },
  variation16Gray900Medium: {
    fontSize: 'variation16',
    fontWeight: 'medium',
    fontColor: 'grey900'
  },
  variation18Grey900Medium: {
    fontSize: 'variation18',
    fontWeight: 'medium',
    fontColor: 'grey900'
  },
  variation20BlackSemi: {
    fontSize: 'variation20',
    fontWeight: 'semibold',
    fontColor: 'black'
  },
  variation20WhiteSemi: {
    fontSize: 'variation20',
    fontWeight: 'semibold',
    fontColor: 'white'
  },
  variation30Grey900Bold: {
    fontSize: 'variation30',
    fontWeight: 'bold',
    fontColor: 'grey900'
  },
  variation30Grey900ExtraBold: {
    fontSize: 'variation30',
    fontWeight: 'extraBold',
    fontColor: 'grey900'
  }
});

export default Text;

declare global {
  interface TextVariations {
    spaceBlocksCore: typeof Text['variationKey'];
  }
}
