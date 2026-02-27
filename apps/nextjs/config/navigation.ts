import { RouteMap, type InferRouteItem } from "@route-map/react";
import { CustomPanel } from "../components/CustomPanel";
import type { LinkProps } from "next/link";
import {
  Ellipsis,
  Home,
  Info,
  LogIn,
  Newspaper,
  Shield,
  ShoppingCart,
  Store,
  User,
  Users,
  Wallet,
} from "@hugeicons/core-free-icons";
import type { HugeiconsIconProps } from "@hugeicons/react";

const nav = new RouteMap<
  "navbar" | "navigation" | "sidebar",
  LinkProps<string>["href"],
  HugeiconsIconProps["icon"]
>()
  .add(["navbar", "navigation", "sidebar"], {
    href: "/",
    Icon: Home,
    order: { navbar: 1, navigation: 1, sidebar: 0 },
    title: { navbar: "House", navigation: "Home", sidebar: "Main" },
  })
  .add(["sidebar", "navbar"], {
    href: "/#wallet",
    Icon: Wallet,
    order: 1,
    title: "Wallet",
    auth: "authenticated",
  })
  .add(["sidebar", "navbar"], {
    href: "/#shopping-cart",
    Icon: ShoppingCart,
    order: { navbar: 2, sidebar: 2 },
    title: "Cart",
    auth: "authenticated",
  })
  .add(["sidebar", "navigation", "navbar"], {
    href: "/#store",
    Icon: Store,
    order: { navigation: 0, navbar: 3, sidebar: 3 },
    title: "Products",
    Children: CustomPanel,
  })
  .add(["sidebar"], {
    href: "/#blog",
    Icon: Newspaper,
    order: 4,
    title: "Blog",
  })
  .add(["navigation", "navbar"], {
    href: "/#login",
    Icon: LogIn,
    order: { navbar: 0, navigation: 999 },
    title: "Login",
    auth: "guest",
  })
  .add(["navigation", "navbar"], {
    href: "/#user",
    Icon: User,
    order: { navbar: 0, navigation: 999 },
    title: "Profile",
    auth: "authenticated",
  })
  .add(["navbar", "navigation"], {
    href: "/#other",
    Icon: Ellipsis,
    order: { navbar: 999, navigation: 2 },
    title: "Other",
    Children: [
      {
        href: "/#about",
        auth: "authenticated",
        title: "About Us",
        Icon: Info,
      },
      {
        href: "/#contact-us",
        title: "Contact Us",
        Icon: Users,
        Children: [{ href: "/", title: "test", Icon: Shield }],
      },
    ],
  })
  .build();

export const {
  getNavbarRoutes,
  getNavigationRoutes,
  getRoutes,
  getSidebarRoutes,
} = nav;

export type RouteItemType = InferRouteItem<typeof nav>;
