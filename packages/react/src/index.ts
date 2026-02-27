import type { ComponentType } from "react";
import type { BaseRouteItem, ResolvedRouteItem } from "./types/route-item";
import type {
  BuiltNavigation,
  InferRouteItem,
} from "./types/navigation-generator";
import { capitalize } from "./utils/capitalize";
import { resolveItems } from "./utils/resolvers";

class RouteMap<Ctx extends string, Routes = string, Ic = ComponentType> {
  private items: BaseRouteItem<readonly Ctx[], Routes, Ic>[] = [];

  add<S extends readonly Ctx[]>(
    showIn: S,
    cfg: Omit<BaseRouteItem<S, Routes, Ic>, "showIn">,
  ): this {
    this.items.push({
      ...cfg,
      showIn,
    });
    return this;
  }

  build(): BuiltNavigation<Ctx, Routes, Ic> {
    const allContexts = Array.from(
      new Set(this.items.flatMap((i) => i.showIn)),
    );

    const getRoutes = (
      context: Ctx,
      loggedIn: boolean,
    ): readonly ResolvedRouteItem<string[], Routes, Ic>[] => {
      return resolveItems(this.items, context, loggedIn);
    };

    const api: Record<string, unknown> = { getRoutes };

    for (const ctx of allContexts) {
      const key = `get${capitalize(ctx)}Routes`;
      api[key] = (loggedIn: boolean) => getRoutes(ctx, loggedIn);
    }

    return api as BuiltNavigation<Ctx, Routes, Ic>;
  }
}

export { RouteMap, type InferRouteItem };
