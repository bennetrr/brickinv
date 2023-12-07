import { LabeledView as LabeledViewBase } from '@wemogy/reactbase';

const LabeledView = LabeledViewBase.extendVariations({
  base: {
    spaceBetweenLabelAndContent: 0.5,
    labelTextVariation: 'variation14Grey700Medium'
  }
});

export default LabeledView;

declare global {
  interface LabeledViewVariations {
    spaceBlocksCore: typeof LabeledView['variationKey'];
  }
}
