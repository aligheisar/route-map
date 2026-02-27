import { ResolvedRouteItem } from "./route-item";

type BuiltNavigation<AllCtx extends string, Routes, Ic> = {
  getRoutes: (
    context: AllCtx,
    loggedIn: boolean,
  ) => readonly ResolvedRouteItem<string[], Routes, Ic>[];
} & {
  [K in Capitalize<AllCtx> as `get${K}Routes`]: (
    loggedIn: boolean,
  ) => readonly ResolvedRouteItem<string[], Routes, Ic>[];
};

type InferRouteItem<N> =
  N extends BuiltNavigation<infer _Ctx, infer _Routes, infer _Ic>
    ? ReturnType<N["getRoutes"]>[number]
    : never;

export type { BuiltNavigation, InferRouteItem };
