import { Modal as ModalBase } from '@wemogy/reactbase';

const Modal = ModalBase.extendVariations({
  base: {
    container: {
      backgroundColor: 'white',
      padding: 1,
      widthFitContent: true
    },
    content: {
      padding: 1,
      paddingRightLeft: 5
    },
    header: {
      paddingTopBottom: 4,
      paddingLeft: 5,
      paddingRight: 8,
      iconVariation: 'base',
      titleVariation: 'variation18Gray900',
      closeIcon: 'xMark',
      closeIconVariation: 'base'
    },
    backdrop: 'blur'
  }
});

export default Modal;

declare global {
  interface ModalVariations {
    brickInv: typeof Modal['variationKey'];
  }
}

declare module '@wemogy/reactbase' {
  export interface IModalKeys {
    addSet: boolean;
    exampleModal: boolean;
  }
}
