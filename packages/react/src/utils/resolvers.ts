import {
  BaseRouteItem,
  ChildRouteItem,
  ResolvedRouteItem,
} from "../types/route-item";
import { authCheck } from "./auth-check";

const resolveTitle = <T extends string>(
  value: string | Record<T, string>,
  context: T,
): string => {
  if (typeof value === "string") return value;
  return value[context];
};

const resolveOrder = <T extends string>(
  value: number | Record<T, number>,
  context: T,
): number => {
  if (typeof value === "number") return value;
  return value[context];
};

const resolveChildNavItem = (
  item: ChildRouteItem[],
  loggedIn: boolean,
): ResolvedRouteItem[] => {
  return item
    .filter((i) => authCheck(i.auth, loggedIn))
    .map<ResolvedRouteItem>((i) => ({
      href: i.href,
      Icon: i.Icon,
      title: i.title,
      Children: i.Children
        ? typeof i.Children === "function"
          ? i.Children
          : resolveChildNavItem(i.Children, loggedIn)
        : undefined,
    }));
};

const resolveItems = <Ctx extends string>(
  items: BaseRouteItem<readonly Ctx[]>[],
  context: Ctx,
  loggedIn: boolean,
) => {
  return items
    .filter((i) => i.showIn.includes(context) && authCheck(i.auth, loggedIn))
    .sort(
      (a, b) => resolveOrder(a.order, context) - resolveOrder(b.order, context),
    )
    .map<ResolvedRouteItem>((i) => ({
      href: i.href,
      Icon: i.Icon,
      title: resolveTitle(i.title, context),
      Children: i.Children
        ? typeof i.Children === "function"
          ? i.Children
          : resolveChildNavItem(i.Children, loggedIn)
        : undefined,
    }));
};

export { resolveItems };
