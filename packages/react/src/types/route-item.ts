import { ComponentType } from "react";

type Auth = "authenticated" | "guest";

type BaseRouteItem<Ctx extends readonly string[], Routes, Ic> = {
  href: Routes;
  Icon?: Ic;
  title: string | Record<Ctx[number], string>;
  order: number | Record<Ctx[number], number>;
  auth?: Auth;
  Children?: ChildRouteItem<Ctx, Routes, Ic>[] | ComponentType;
  showIn: Ctx;
};

type ChildRouteItem<Ctx extends readonly string[], Routes, Ic> = Pick<
  BaseRouteItem<Ctx, Routes, Ic>,
  "href" | "auth" | "Children"
> & {
  title: string;
  Icon?: Ic;
};

type ResolvedRouteItem<Ctx extends readonly string[], Routes, Ic> = {
  href: BaseRouteItem<Ctx, Routes, Ic>["href"];
  Icon?: Ic;
  title: string;
  Children?: ResolvedRouteItem<Ctx, Routes, Ic>[] | ComponentType;
};

export type { BaseRouteItem, ChildRouteItem, ResolvedRouteItem, Auth };
