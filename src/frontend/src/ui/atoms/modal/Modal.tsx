import { Modal as ModalBase } from '@wemogy/reactbase';

const Modal = ModalBase.extendVariations({
  base: {
    container: {
      backgroundColor: 'white',
      padding: 3,
      width100: true,
      maxWidth: 64
    },
    content: {
      width100: true,
      maxWidth: 64
    }
  }
});

export default Modal;

declare global {
  interface ModalVariations {
    spaceBlocksPortal: typeof Modal['variationKey'];
  }
}

declare module '@wemogy/reactbase' {
  export interface IModalKeys {
    addSet: boolean;
  }
}
