import { Button as ButtonBase } from '@wemogy/reactbase';
import { LoadingIndicator } from '../loadingIndicator';

const Button = ButtonBase.extendVariations({
  base: {
    border: 0,
    borderRadius: 0.75,
    paddingTopBottom: true,
    paddingRightLeft: 2,
    textAlign: 'center',
    lineHeight: 20,
    iconSpacing: 2
  },
  primary: {
    backgroundColor: 'primary',
    fontColor: 'white',
    fontWeight: 'medium',
    fontSize: 'variation16',
    iconVariation: 'variation2White',
    iconSpacing: 1,
    lineHeight: 24
  },
  primary14: {
    backgroundColor: 'primary',
    fontColor: 'white',
    fontWeight: 'medium',
    fontSize: 'variation14',
    paddingTopBottom: 1,
    iconVariation: 'variation2White',
    iconSpacing: 1
  },
  primary14Accent: {
    backgroundColor: 'transparent',
    fontColor: 'primary',
    fontWeight: 'medium',
    fontSize: 'variation14',
    border: { custom: 1 },
    borderColor: 'primary',
    borderRadius: 0.75
  },
  secondary14: {
    backgroundColor: 'white',
    borderColor: 'grey300',
    border: { custom: 1 },
    fontColor: 'grey700',
    fontWeight: 'medium',
    fontSize: 'variation14',
    iconVariation: 'variation2Grey700',
    paddingTopBottom: 1
  },
  secondary14Disabled: {
    backgroundColor: 'grey50',
    borderColor: 'grey300',
    border: { custom: 1 },
    fontColor: 'grey400',
    fontWeight: 'medium',
    fontSize: 'variation14',
    paddingTopBottom: 1
  },
  borderless: {
    border: 0,
    paddingTopBottom: 0,
    paddingLeftRight: 0,
    backgroundColor: undefined,
    fontColor: 'primary',
    fontSize: 'variation14'
  },
  danger16: {
    fontSize: 'variation16',
    fontWeight: 'medium',
    fontColor: 'white',
    backgroundColor: 'red500'
  },
  loadingStyle: {
    paddingTopBottom: 1,
    fontSize: 'variation16',
    fontColor: 'white',
    fontWeight: 'medium',
    backgroundColor: 'primaryDisabled'
  },
  navButton: {
    height: 7,
    width: 40,
    iconVariation: 'navButton',
    iconPosition: 'right',
    iconSpacing: 27,
    fontColor: 'grey700',
    fontSize: 'variation16',
    backgroundColor: 'white',
    borderColor: 'grey300',
    border: { custom: 1 }
  },
  iconButton: {
    backgroundColor: 'white',
    borderColor: 'grey300',
    border: { custom: 1 },
    fontColor: 'grey700',
    fontWeight: 'medium',
    fontSize: 'variation14',
    iconVariation: 'variation2Grey700',
    height: 5,
    width: 5,
    paddingTopBottom: 0,
    paddingRightLeft: 0,
    iconSpacing: 1.25,
    iconPosition: 'right'
  },
  iconButtonBorderless: {
    backgroundColor: 'white',
    fontColor: 'grey700',
    fontWeight: 'medium',
    fontSize: 'variation14',
    iconVariation: 'variation2Grey700',
    height: 5,
    width: 5,
    paddingTopBottom: 0,
    paddingRightLeft: 0,
    iconSpacing: 1.25,
    iconPosition: 'right'
  }
}).registerDependencies({
  loadingIndicator: () => <LoadingIndicator beat/>
});

export default Button;

declare global {
  interface ButtonVariations {
    spaceBlocksPortal: typeof Button['variationKey'];
  }
}
