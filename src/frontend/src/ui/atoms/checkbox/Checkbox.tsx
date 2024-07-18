import { Checkbox as CheckboxBase } from '@wemogy/reactbase';

const Checkbox = CheckboxBase.extendVariations({
  base: {
    checkedIcon: 'stopSolid',
    checkedIconVariation: 'variation3Primary500',
    uncheckedIcon: 'stop',
    uncheckedIconVariation: 'variation3Gray300'
  }
});

export default Checkbox;

declare global {
  interface CheckboxVariations {
    brickInv: typeof Checkbox['variationKey'];
  }
}
