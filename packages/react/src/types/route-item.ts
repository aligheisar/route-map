import { ComponentType } from "react";

type Auth = "authenticated" | "guest";
type IconType = ComponentType<HTMLElement>;

type BaseRouteItem<Ctx extends readonly string[]> = {
  href: string;
  Icon?: IconType;
  title: string | Record<Ctx[number], string>;
  order: number | Record<Ctx[number], number>;
  auth?: Auth;
  Children?: ChildRouteItem[] | ComponentType;
  showIn: Ctx;
};

type ChildRouteItem<Ctx extends readonly string[] = string[]> = Pick<
  BaseRouteItem<Ctx>,
  "href" | "auth" | "Children"
> & {
  title: BaseRouteItem<Ctx>["href"];
  Icon?: IconType;
};

type ResolvedRouteItem<Ctx extends readonly string[] = string[]> = {
  href: BaseRouteItem<Ctx>["href"];
  Icon?: IconType;
  title: string;
  Children?: ResolvedRouteItem[] | ComponentType;
};

export type { BaseRouteItem, ChildRouteItem, ResolvedRouteItem, Auth };
