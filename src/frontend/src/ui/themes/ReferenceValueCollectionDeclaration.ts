import { DefaultReferenceValueCollection, themeDeclarationTypes } from '@wemogy/reactbase';

const referenceValueCollectionDeclaration = DefaultReferenceValueCollection.extendVariations({
  fontFamily: {
    title: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string)
  },
  fontSize: {
    variation12: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation14: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation16: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation18: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation20: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    variation30: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number)
  },
  fontWeight: {
    medium: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    semibold: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    bold: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number),
    extraBold: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.number)
  },
  color: {
    primary: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primaryDark: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    primaryDisabled: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    white: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey50: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    grey900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    green900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    greyDark: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    greyLight: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    black: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red200: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red300: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red400: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red500: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red600: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red700: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red800: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    red900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    indigo100: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    indigo900: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string),
    transparent: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.string)
  },
  borderRadiusSize: {
    medium: themeDeclarationTypes.themeModeBased(themeDeclarationTypes.factor)
  }
});

export default referenceValueCollectionDeclaration;

declare global {
  interface IReferenceValueCollectionDeclaration {
    declaration: typeof referenceValueCollectionDeclaration['declaration'];
    variations: typeof referenceValueCollectionDeclaration['variations'];
  }
}
