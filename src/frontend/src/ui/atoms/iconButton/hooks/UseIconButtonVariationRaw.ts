import { createUseComponentVariationRawHook } from '@wemogy/reactbase';
import IconButtonThemeDeclaration from "../theme/IconButtonThemeDeclaration.ts";

const useIconButtonVariationRaw = createUseComponentVariationRawHook(
  IconButtonThemeDeclaration
);

export default useIconButtonVariationRaw;
