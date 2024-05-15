import { ToasterBase, TranslationInformation } from '@wemogy/reactbase';

class Toaster extends ToasterBase {
  public constructor() {
    super();
  }

  public success(message: TranslationInformation) {
    return this.showToast(
      {
        text: message,
        textVariation: 'variation14Green500Medium'
      },
      {
        type: 'success',
        icon: {
          icon: 'checkCircle',
          iconVariation: 'variation3Green500'
        }
      }
    );
  }

  public error(message: TranslationInformation) {
    return this.showToast(
      {
        text: message,
        textVariation: 'variation14Red500Medium'
      },
      {
        type: 'error',
        icon: {
          icon: 'exclamationCircle',
          iconVariation: 'variation3Red500'
        }
      }
    );
  }

  public information(message: TranslationInformation) {
    return this.showToast(
      {
        text: message,
        textVariation: 'variation14Gray500Medium'
      },
      {
        type: undefined,
        icon: {
          icon: 'informationCircle',
          iconVariation: 'variation3Gray500'
        }
      }
    );
  }
}

const toast = new Toaster();

export default toast;
