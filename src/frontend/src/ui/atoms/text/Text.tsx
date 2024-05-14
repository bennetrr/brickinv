import { Text as TextBase } from '@wemogy/reactbase';

const Text = TextBase.extendVariations({
  base: {
    fontFamily: 'default',
    fontSize: 'variation14',
    fontColor: 'gray900',
    textSelectable: false,
  },
  medium: {
    fontWeight: 'medium'
  },
  title: {
    fontSize: 'variation18',
    fontWeight: 'medium',
    fontColor: 'gray900'
  },
  cta: {
    fontSize: 'variation14',
    fontColor: 'primary500'
  },
  variation12Gray500Medium: {
    fontSize: 'variation12',
    fontWeight: 'medium',
    fontColor: 'gray500'
  },
  variation14Gray500: {
    base: {
      fontSize: 'variation14',
      fontColor: 'gray500'
    },
    medium: {
      fontWeight: 'medium'
    }
  },
  variation14WhiteMedium: {
    fontSize: 'variation14',
    fontWeight: 'medium',
    fontColor: 'white'
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
  variation20WhiteSemi: {
    fontSize: 'variation20',
    fontWeight: 'semiBold',
    fontColor: 'white'
  },
  variation30Gray900Bold: {
    fontSize: 'variation30',
    fontWeight: 'bold',
    fontColor: 'gray900'
  },
  variation60Grey600Thin: {
    lineHeight: 50,
    fontSize: 'variation60',
    fontWeight: 'thin',
    fontColor: 'gray600'
  }
});

export default Text;

declare global {
  interface TextVariations {
    brickInv: typeof Text['variationKey'];
  }
}
