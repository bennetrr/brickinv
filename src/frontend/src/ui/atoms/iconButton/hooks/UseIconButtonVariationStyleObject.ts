import { createUseComponentVariationStyleObjectHook } from "@wemogy/reactbase";
import IconButtonThemeDeclaration from "../theme/IconButtonThemeDeclaration.ts";

const useIconButtonVariationStyleObject =
  createUseComponentVariationStyleObjectHook(IconButtonThemeDeclaration);

export default useIconButtonVariationStyleObject;
