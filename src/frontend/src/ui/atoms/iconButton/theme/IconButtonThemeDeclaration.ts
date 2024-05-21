import {
  backgroundPropertyGroup,
  borderPropertyGroup,
  ComponentThemeDeclarationBuilder,
  dimensionPropertyGroup,
  fontPropertyGroup,
  iconVariationThemeDeclarationType,
  marginPropertyGroup,
  opacityPropertyGroup,
  paddingPropertyGroup,
  themeDeclarationTypes
} from '@wemogy/reactbase';

const IconButtonThemeDeclaration =
  ComponentThemeDeclarationBuilder.createComponentThemeDeclaration({
    ...marginPropertyGroup,
    ...paddingPropertyGroup,
    ...backgroundPropertyGroup,
    ...fontPropertyGroup,
    ...dimensionPropertyGroup,
    ...opacityPropertyGroup,
    ...borderPropertyGroup,
    iconVariation: themeDeclarationTypes.responsive(
      iconVariationThemeDeclarationType
    ),
    /**
     * Shortcut for flex: 1, which means:
     * flex-grow: 1
     * flex-shrink: 1
     * flex-basis: 1
     */
    stretch: themeDeclarationTypes
      .responsive(themeDeclarationTypes.boolean)
      .withCssResolver((stretch) => {
        if (!stretch) {
          return {};
        }

        return {
          flex: 1
        };
      })
  });

export default IconButtonThemeDeclaration;
