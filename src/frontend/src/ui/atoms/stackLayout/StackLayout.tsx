import { StackLayout as StackLayoutBase } from '@wemogy/reactbase';

const StackLayout = StackLayoutBase.extendVariations({
  base: {
    position: 'relative',
    border: 0
  },
  divider1: {
    height: { custom: 1 },
    backgroundColor: 'grey200'
  }
});

export default StackLayout;

declare global {
  interface StackLayoutVariations {
    spaceBlocksCore: typeof StackLayout['variationKey'];
  }
}
