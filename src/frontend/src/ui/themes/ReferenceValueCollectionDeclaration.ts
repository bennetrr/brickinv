import { DefaultReferenceValueCollection, themeDeclarationTypes } from '@wemogy/reactbase';

const referenceValueCollectionDeclaration = DefaultReferenceValueCollection.extendVariations({
  fontFamily: {
    title: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    code: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string)
  },
  fontSize: {
    variation12: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation14: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation16: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation18: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation20: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation30: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation60: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number)
  },
  fontWeight: {
    thin: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    extraLight: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    light: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    default: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    medium: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    semiBold: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    bold: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    extraBold: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    black: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number)
  },
  color: {
    primary100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primary900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    transparent: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    white: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    gray900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    black: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string)
  }
});

export default referenceValueCollectionDeclaration;

declare global {
  interface IReferenceValueCollectionDeclaration {
    declaration: typeof referenceValueCollectionDeclaration['declaration'];
    variations: typeof referenceValueCollectionDeclaration['variations'];
  }
}
