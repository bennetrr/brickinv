import { createReactBaseComponent, useButtonVariation } from '@wemogy/reactbase';
import { LoadingIndicator } from '../loadingIndicator';
import IconButtonImplementation from "./implementation/IconButtonImplementation.tsx";
import IconButtonThemeDeclaration from "./theme/IconButtonThemeDeclaration.ts";
import IIconButtonDependencies from "./types/IIconButtonDependencies.ts";

const IconButtonComponent = createReactBaseComponent(
  IconButtonImplementation,
  IconButtonThemeDeclaration,
  {
    base: {
      height: 5,
      width: 5,
      border: 0,
      borderRadius: 0.75
    },
    primary: {
      base: {
        backgroundColor: 'primary500',
        fontColor: 'white',
        iconVariation: 'variation2White',
      },
      disabled: {
        backgroundColor: 'primary300',
      }
    },
    secondary: {
      base: {
        backgroundColor: 'white',
        border: { custom: 1 },
        borderColor: 'gray900',
        fontColor: 'gray900',
        iconVariation: 'variation2Gray900'
      },
      disabled: {
        backgroundColor: 'gray100',
        borderColor: 'gray500',
        fontColor: 'gray500',
        iconVariation: 'variation2Gray500'
      }
    },
    borderless: {
      base: {
        paddingTopBottom: 0,
        paddingRightLeft: 0,
        backgroundColor: 'transparent',
        fontColor: 'primary500',
        iconVariation: 'variation2Primary500'
      },
      disabled: {
        fontColor: 'primary300',
        iconVariation: 'variation2Primary300'
      }
    },
    danger: {
      base: {
        fontColor: 'white',
        backgroundColor: 'red500',
        iconVariation: 'variation2White'
      },
      disabled: {
        backgroundColor: 'red400',
      }
    },
    navigation: {
      base: {
        width: 40,
        height: 7,
        backgroundColor: 'white',
        border: { custom: 1 },
        borderColor: 'gray700',
        fontSize: 'variation16',
        fontColor: 'gray700',
        iconVariation: 'navigationButton',
        iconPosition: 'right',
        iconSpacing: 27
      },
      disabled: {
        backgroundColor: 'gray200',
        borderColor: 'gray400',
        fontColor: 'gray400',
        iconVariation: 'navigationButtonDisabled',
      }
    }
  }
)
  .withDependencies<IIconButtonDependencies>()
  .registerDependencies({
    loadingIndicator: () => {
      const { fontColor } = useButtonVariation();

      return <LoadingIndicator puff color={fontColor}/>;
    }
  });

export default IconButtonComponent;
