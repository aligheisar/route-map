**route-map/react** is a small TypeScript utility that lets you define navigation
items for your React app in one place. It generates helper
functions so you can easily render sidebars, menus, or dashboards based
on context and authentication state.

## Features

- Central navigation configuration.
- Context-aware titles and ordering.
- Allows rendering React components as children of a route.
- Authentication-based filtering.
- Simple add → build workflow.
- Optional strong typing for `href` and `Icon`.

## Basic Usage

```ts
import { RouteMap } from "@route-map/react";

const navigation = new RouteMap<"navbar" | "sidebar">()
  .add(["navbar", "sidebar"], {
    href: "/",
    Icon: HomeIcon,
    title: { sidebar: "Main", navbar: "Home" }, // Different titles per context, or one title for all contexts
    order: 1, // Different order values per context, or one for all
    // If auth is not set, the route is shown to both authenticated and guest users
  })
  .add(["sidebar"], {
    href: "/login",
    Icon: LoginIcon,
    title: "Login",
    order: 2,
    auth: "guest", // Only shown when the user is not logged in
  })
  .add(["navbar"], {
    href: "/notifications",
    Icon: NotificationIcon,
    title: "Notifications",
    order: 2,
    auth: "authenticated",
    Children: NotificationPanel, // Example: render it on hover/focus
  })
  .add(["sidebar", "navbar"], {
    href: "/profile",
    Icon: ProfileIcon,
    title: "Profile",
    order: { sidebar: 2, navbar: 3 },
    auth: "authenticated", // Only shown when the user is logged in
    Children: [
      // Route nesting is unlimited
      { href: "/profile/cart", title: "Cart", Icon: CartIcon },
      {
        href: "/profile/settings",
        title: "Settings",
        Icon: SettingsIcon,
        Children: [
          {
            href: "/profile/settings#security",
            title: "Security",
            Icon: SecurityIcon,
          },
          {
            href: "/profile/settings#accessibility",
            title: "Accessibility",
            Icon: AccessibilityIcon,
          },
        ],
      },
    ],
  })
  .build();

// Generated helpers
navigation.getRoutes(context, isLoggedIn);
navigation.getNavbarRoutes(isLoggedIn);
navigation.getSidebarRoutes(isLoggedIn);
```

## Typed `href` and `Icon`

You can optionally provide custom types for `href` and `Icon`. This is especially useful in frameworks like Next.js where `href` has a specific type or when using strongly typed icon libraries.

### Generic Signature

```ts
new RouteMap<Context, HrefType, IconType>()
```

- `Context` – Union of navigation contexts.
- `HrefType` – Custom type for `href`.
- `IconType` – Custom type for `Icon`.

If `HrefType` and `IconType` are not provided, they default to `string` and `React.ComponentType<any>`.

### Example (Next.js, Hugeicons)

```ts
import { RouteMap, type InferRouteItem } from "@route-map/react";
import type { LinkProps } from "next/link";
import {
  Home,
  LogIn,
  Notification,
  User,
  Settings,
  Cart,
  Shield,
  Accessibility,
} from "@hugeicons/core-free-icons";
import type { HugeiconsIconProps } from "@hugeicons/react";
import { NotificationPanel } from "../panels/NotificationPanel";

const nav = new RouteMap<
  "navbar" | "sidebar",
  // fully type-safe href with typedRoute enabled in `next.config` file
  LinkProps<string>["href"],
  HugeiconsIconProps["icon"]
>()
  .add(["navbar", "sidebar"], {
    href: "/",
    Icon: Home,
    title: { sidebar: "Main", navbar: "Home" },
    order: 1,
  })
  .add(["sidebar"], {
    href: "/login",
    Icon: LogIn,
    title: "Login",
    order: 2,
    auth: "guest",
  })
  .add(["navbar"], {
    href: "/notifications",
    Icon: Notification,
    title: "Notifications",
    order: 2,
    auth: "authenticated",
    Children: NotificationPanel,
  })
  .add(["sidebar", "navbar"], {
    href: "/profile",
    Icon: User,
    title: "Profile",
    order: { sidebar: 2, navbar: 3 },
    auth: "authenticated",
    Children: [
      { href: "/profile/cart", title: "Cart", Icon: Cart},
      {
        href: "/profile/settings",
        title: "Settings",
        Icon: Settings,
        Children: [
          {
            href: "/profile/settings#security",
            title: "Security",
            Icon: Shield,
          },
          {
            href: "/profile/settings#accessibility",
            title: "Accessibility",
            Icon: Accessibility,
          },
        ],
      },
    ],
  })
  .build();

export const {
  getNavbarRoutes,
  getRoutes,
  getSidebarRoutes,
} = nav;

// type of returned route item
export type RouteItemType = InferRouteItem<typeof nav>;
```

## Rendering Example

```tsx
function RouteItem(route: RouteItemType) {
  return (
    <div>
      <Link href={route.href}>
        {route.Icon && <route.Icon />}
        {route.title}
      </Link>
      {route.Children &&
        (typeof route.Children === "function" ? (
          <route.Children />
        ) : (
          <div>
            {route.Children.map((route) => (
              <RouteItem key={route.href.toString()} {...route} />
            ))}
          </div>
        ))}
    </div>
  );
}

function Navbar() {
  const currentUser = getCurrentUser();
  const routes = navigation.getNavbarRoutes(!!currentUser);

  return (
    <nav>
      {routes.map((route) => (
        <RouteItem key={route.href.toString()} {...route} />
      ))}
    </nav>
  );
}
```
