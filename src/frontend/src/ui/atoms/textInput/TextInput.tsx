import {styled, TextInput as TextInputBase} from '@wemogy/reactbase';
import {primary} from '../../themes/Colors.ts';

const TextInput = TextInputBase.extendVariations({
  base: {
    base: {
      width100: true,
      border: { custom: 1 },
      borderColor: 'gray900',
      borderRadius: 0.75,
      height: 5,
      padding: 1,
      iconPosition: 'right',
      iconVariation: 'variation2Gray900',
      placeholderTextColor: 'gray500',
      backgroundColor: 'white',
      autocompleteResultsBackgroundColor: 'gray100',
      autocompleteResultTextVariation: 'base',
      autocompleteResultHoverFontColor: 'primary500'
    },
    disabled: {
      backgroundColor: 'gray100',
      borderColor: 'gray500',
      fontColor: 'gray500',
      iconVariation: 'variation2Gray500',
      placeholderTextColor: 'gray300'
    }
  }
});

export default styled(TextInput)`
  &, & input {
    outline: none !important;
  }

  &:focus, &:has(input:focus) {
    border-color: ${primary[500]};
  }
` as typeof TextInput;

declare global {
  interface TextInputVariations {
    brickInv: typeof TextInput['variationKey'];
  }
}
