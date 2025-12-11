import { useState } from "react";
import { getNavbarRoutes } from "../config/navigation";
import { RouteItem } from "./RouteItem";

const Navbar = () => {
  return (
    <nav>
      <NavbarItems />
    </nav>
  );
};

const NavbarItems = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const routes = getNavbarRoutes(isLoggedIn);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <button onClick={() => setIsLoggedIn((prev) => !prev)}>
        toggle login
      </button>
      <div style={{ display: "flex", gap: "8px" }}>
        {routes.map((item) => (
          <RouteItem key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
};

export { Navbar };
