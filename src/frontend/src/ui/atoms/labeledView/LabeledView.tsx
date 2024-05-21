import { LabeledView as LabeledViewBase } from '@wemogy/reactbase';

const LabeledView = LabeledViewBase.extendVariations({
  base: {
    spaceBetweenLabelAndContent: 0.5,
    labelTextVariation: 'base'
  }
});

export default LabeledView;

declare global {
  interface LabeledViewVariations {
    brickInv: typeof LabeledView['variationKey'];
  }
}
