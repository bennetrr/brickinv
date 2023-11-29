import { StackLayout as StackLayoutBase } from '@wemogy/reactbase';

const StackLayout = StackLayoutBase.extendVariations({
  base: {}
});

export default StackLayout;

declare global {
  interface StackLayoutVariations {
    lego: typeof StackLayout['variationKey'];
  }
}
