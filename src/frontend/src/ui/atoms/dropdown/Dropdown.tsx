import { Dropdown as DropdownBase } from '@wemogy/reactbase';

const Dropdown = DropdownBase.extendVariations({
  base: {
    singleValueTextVariation: 'variation14Grey500',
    isSearchable: false,
    dropdownIndicatorIcon: 'chevronUpDown',
    dropdownIndicatorIconVariation: 'variation2Grey400',
    borderColor: 'grey300',
    borderRadius: 0.75,
    paddingRightLeft: 1,
    height: 5,
    border: { custom: 1 },
    option: {
      selectedBackgroundColor: 'grey100',
      focusedBackgroundColor: 'grey100'
    },
    menuPlacement: 'auto'
  },
  dark: {
    singleValueTextVariation: 'variation14WhiteMedium',
    backgroundColor: 'grey700',
    border: 0,
    option: {
      selectedBackgroundColor: 'grey700',
      focusedBackgroundColor: 'grey700'
    }
  }
});

export default Dropdown;

declare global {
  interface DropdownVariations {
    spaceBlocksCore: typeof Dropdown['variationKey'];
  }
}
