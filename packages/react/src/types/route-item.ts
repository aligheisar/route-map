import { ComponentType } from "react";

type Auth = "authenticated" | "guest";
type IconType = ComponentType<{ className?: string }>;
type RouteChildren = ChildRouteItem[] | ComponentType;

type BaseRouteItem<Ctx extends readonly string[]> = {
  href: string;
  Icon: IconType;
  title: string | Record<Ctx[number], string>;
  order: number | Record<Ctx[number], number>;
  auth?: Auth;
  Children?: RouteChildren;
  showIn: Ctx;
};

type ChildRouteItem = Pick<
  BaseRouteItem<string[]>,
  "href" | "auth" | "Children"
> & {
  title: string;
  Icon?: IconType;
};

type ResolvedRouteItem = {
  href: BaseRouteItem<string[]>["href"];
  Icon: IconType;
  title: string;
  Children?: RouteChildren;
};

type ResolvedChildRouteItem = Pick<
  ChildRouteItem,
  "Children" | "href" | "Icon" | "title"
>;

export type {
  BaseRouteItem,
  ChildRouteItem,
  ResolvedRouteItem,
  ResolvedChildRouteItem,
  Auth,
};
