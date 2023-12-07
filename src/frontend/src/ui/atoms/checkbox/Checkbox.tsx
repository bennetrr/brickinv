import { Checkbox as CheckboxBase } from '@wemogy/reactbase';

const Checkbox = CheckboxBase.extendVariations({
  base: {
    checkedIcon: 'stopSolid',
    uncheckedIcon: 'stop',
    checkedIconVariation: 'variation3Primary',
    uncheckedIconVariation: 'variation3Grey300'
  }
});

export default Checkbox;

declare global {
  interface CheckboxVariations {
    spaceBlocksPortal: typeof Checkbox['variationKey'];
  }
}
