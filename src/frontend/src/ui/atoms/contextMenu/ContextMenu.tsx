import { ContextMenu as ContextMenuBase } from '@wemogy/reactbase';

const ContextMenu = ContextMenuBase.extendVariations({
  base: {
    backgroundColor: 'white',
    borderRadius: 0.75
  }
});

export default ContextMenu;

declare global {
  interface ContextMenuVariations {
    spaceBlocksPortal: typeof ContextMenu['variationKey'];
  }
}
