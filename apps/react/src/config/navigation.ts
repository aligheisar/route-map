import { RouteMap } from "@route-map/react";
import {
  Ban,
  Ellipsis,
  Home,
  Info,
  LogIn,
  Newspaper,
  ShoppingCart,
  Store,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { CustomPanel } from "../components/CustomPanel";

const { getNavbarRoutes, getNavigationRoutes, getRoutes, getSidebarRoutes } =
  new RouteMap<"navbar" | "navigation" | "sidebar">()
    .add(["navbar", "navigation", "sidebar"], {
      href: "/",
      Icon: Home,
      order: { navbar: 1, navigation: 1, sidebar: 0 },
      title: { navbar: "House", navigation: "Home", sidebar: "Main" },
    })
    .add(["sidebar", "navbar"], {
      href: "/wallet",
      Icon: Wallet,
      order: 1,
      title: "Wallet",
      auth: "authenticated",
    })
    .add(["sidebar", "navbar"], {
      href: "/cart",
      Icon: ShoppingCart,
      order: { navbar: 2, sidebar: 2 },
      title: "Cart",
      auth: "authenticated",
    })
    .add(["sidebar", "navigation", "navbar"], {
      href: "/products",
      Icon: Store,
      order: { navigation: 0, navbar: 3, sidebar: 3 },
      title: "Products",
      Children: CustomPanel,
    })
    .add(["sidebar"], {
      href: "/blog",
      Icon: Newspaper,
      order: 4,
      title: "Blog",
    })
    .add(["navigation", "navbar"], {
      href: "/login",
      Icon: LogIn,
      order: { navbar: 0, navigation: 999 },
      title: "Login",
      auth: "guest",
    })
    .add(["navigation", "navbar"], {
      href: "/profile",
      Icon: User,
      order: { navbar: 0, navigation: 999 },
      title: "Profile",
      auth: "authenticated",
    })
    .add(["navbar", "navigation"], {
      href: "#",
      Icon: Ellipsis,
      order: { navbar: 999, navigation: 2 },
      title: "Other",
      Children: [
        {
          href: "/about-us",
          auth: "authenticated",
          title: "About Us",
          Icon: Info,
        },
        {
          href: "/contact-us",
          title: "Contact Us",
          Icon: Users,
          Children: [{ href: "/test", title: "test", Icon: Ban }],
        },
      ],
    })
    .build();

export { getNavbarRoutes, getNavigationRoutes, getRoutes, getSidebarRoutes };
