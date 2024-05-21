import { createUseComponentDependenciesHook } from "@wemogy/reactbase/src/ui/reactBaseComponentFactoryBuilder";
import IconButtonThemeDeclaration from "../theme/IconButtonThemeDeclaration.ts";
import IIconButtonDependencies from "../types/IIconButtonDependencies.ts";

const useIconButtonDependencies =
  createUseComponentDependenciesHook<IIconButtonDependencies>(
    IconButtonThemeDeclaration
  );

export default useIconButtonDependencies;
