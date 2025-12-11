import { ComponentType } from "react";

type Auth = "authenticated" | "guest";
type Icon = ComponentType<{ className?: string }>;
type RouteChildren = ChildRouteItem[] | ComponentType;

type BaseRouteItem<Ctx extends readonly string[]> = {
  href: string;
  icon: Icon;
  title: string | Record<Ctx[number], string>;
  order: number | Record<Ctx[number], number>;
  auth?: Auth;
  children?: RouteChildren;
  showIn: Ctx;
};

type ChildRouteItem = Pick<
  BaseRouteItem<string[]>,
  "href" | "auth" | "children"
> & {
  title: string;
  icon?: Icon;
};

type ResolvedRouteItem = {
  href: BaseRouteItem<string[]>["href"];
  icon: Icon;
  title: string;
  children?: RouteChildren;
};

type ResolvedChildRouteItem = Pick<
  ChildRouteItem,
  "children" | "href" | "icon" | "title"
>;

export type {
  BaseRouteItem,
  ChildRouteItem,
  ResolvedRouteItem,
  ResolvedChildRouteItem,
  Auth,
};
