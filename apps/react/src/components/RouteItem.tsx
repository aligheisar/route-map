import type { RouteItemType } from "@route-map/react";

const RouteItem = ({ href, Icon, title, Children }: RouteItemType) => {
  return (
    <div style={{ position: "relative" }}>
      <a href={href}>
        {Icon && <Icon />}
        {title}
      </a>
      {Children ? (
        typeof Children === "function" ? (
          <Children />
        ) : (
          <div
            style={{
              background: "red",
              width: "max-content",
              position: "absolute",
              left: "100%",
            }}
          >
            {Children.map((item) => (
              <RouteItem key={item.href} {...item} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export { RouteItem };
