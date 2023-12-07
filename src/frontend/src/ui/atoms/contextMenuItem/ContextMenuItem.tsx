import { ContextMenuItem as ContextMenuItemBase } from '@wemogy/reactbase';

const ContextMenuItem = ContextMenuItemBase.extendVariations({
  base: {
    paddingRightLeft: 2.5,
    paddingTopBottom: 1.5,
    iconVariation: 'variation2Dot5Grey400',
    textVariation: 'variation14Grey700',
    hoverTextVariation: 'variation14Grey700Medium',
    spaceBetweenIconAndLabel: 2
  }
});

export default ContextMenuItem;

declare global {
  interface ContextMenuItemVariations {
    spaceBlocksPortal: typeof ContextMenuItem['variationKey'];
  }
}
