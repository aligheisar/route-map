import type { ChildRouteItemType } from "@route-map/react";

const ChildRouteItem = ({
  href,
  title,
  Children,
  Icon,
}: ChildRouteItemType) => {
  return (
    <div data-href={href} style={{ position: "relative" }}>
      {Icon && <Icon />}
      {title}
      {Children ? (
        typeof Children === "function" ? (
          <Children />
        ) : (
          <div
            style={{
              background: "cyan",
              width: "max-content",
              position: "absolute",
              left: "100%",
            }}
          >
            {Children.map((item: ChildRouteItemType) => (
              <ChildRouteItem key={item.href} {...item} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export { ChildRouteItem };
