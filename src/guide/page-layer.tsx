import React from "react";
import { SCOPE_ATTR } from "../core/stage";

export const PageLayer: React.FC<{
  visible: boolean;
  scope?: string;
  children: React.ReactNode;
}> = ({ visible, scope, children }) => (
  <div
    {...(scope ? { [SCOPE_ATTR]: scope } : {})}
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      opacity: visible ? 1 : 0,
    }}
  >
    {children}
  </div>
);
