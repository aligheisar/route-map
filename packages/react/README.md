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

## How It Works

- `new RouteMap<Context>()` creates a builder.
- `.add(showIn, item)` registers a navigation item.
- `.build()` generates a typed API with:
  - `getRoutes(context, loggedIn)`
  - `get<Context>Routes(loggedIn)`

## Rendering Example

```tsx
function RouteItem(route: RouteItemType) {
  return (
    <div>
      <a href={route.href}>
        {route.Icon && <route.Icon />}
        {route.title}
      </a>
      {route.Children &&
        (typeof route.Children === "function" ? (
          <route.Children />
        ) : (
          <div>
            {route.Children.map((route) => (
              <RouteItem key={route.href} {...route} />
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
        <RouteItem key={route.href} {...route} />
      ))}
    </nav>
  );
}
```
