import { ResolvedRouteItem } from "./route-item";

type BuiltNavigation<AllCtx extends string> = {
  getRoutes: (
    context: AllCtx,
    loggedIn: boolean,
  ) => readonly ResolvedRouteItem[];
} & {
  [K in Capitalize<AllCtx> as `get${K}Routes`]: (
    loggedIn: boolean,
  ) => readonly ResolvedRouteItem[];
};

export type { BuiltNavigation };
