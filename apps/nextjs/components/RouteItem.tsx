import type { RouteItemType } from "@/config/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const RouteItem = ({ href, Icon, title, Children }: RouteItemType) => {
  return (
    <div style={{ position: "relative" }}>
      <Link href={href}>
        {Icon && <HugeiconsIcon icon={Icon} />}
        {title}
      </Link>
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
              <RouteItem key={item.href.toString()} {...item} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export { RouteItem };
