import { StackLayout as StackLayoutBase } from '@wemogy/reactbase';

const StackLayout = StackLayoutBase.extendVariations({
  base: {
    position: 'relative',
    border: 0
  },
  divider1: {
    height: { custom: 1 },
    backgroundColor: 'grey200'
  },
  colorSquare: {
    width: 20,
    height: 20,
    hCenter: true,
    vCenter: true
  }
});

export default StackLayout;

declare global {
  interface StackLayoutVariations {
    spaceBlocksCore: typeof StackLayout['variationKey'];
  }
}
