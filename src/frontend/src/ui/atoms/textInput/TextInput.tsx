import { TextInput as TextInputBase } from '@wemogy/reactbase';

const TextInput = TextInputBase.extendVariations({
  base: {
    width100: true,
    border: { custom: 1 },
    borderColor: 'grey300',
    borderRadius: 0.5,
    height: 5,
    padding: 1,
    iconPosition: 'right',
    iconVariation: 'variation2Grey300',
    placeholderTextColor: 'grey300',
    backgroundColor: 'white'
  }
});

export default TextInput;

declare global {
  interface TextInputVariations {
    spaceBlocksCore: typeof TextInput['variationKey'];
  }
}
