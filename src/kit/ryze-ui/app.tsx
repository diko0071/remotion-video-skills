import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { Navbar } from "./navbar";
import { Rail } from "./rail";

const { fontFamily } = loadFont();

export type ShellOverride = {
  expanded?: boolean;
  section?: "dashboard" | "seo";
  nav?: string;
};

const ShellContext = React.createContext<ShellOverride | null>(null);

export const ShellOverrideProvider: React.FC<{
  value: ShellOverride;
  children: React.ReactNode;
}> = ({ value, children }) => <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;

export const RyzeApp: React.FC<{
  workspace?: string;
  children: React.ReactNode;
  panel?: React.ReactNode;
  stretch?: boolean;
  page?: string;
  nav?: string;
  credits?: string;
}> = ({
  workspace = "brightland",
  children,
  panel,
  stretch = false,
  page = "Chat",
  nav,
  credits,
}) => {
  const shell = React.useContext(ShellContext);
  return (
    <AbsoluteFill style={{ fontFamily, background: "var(--background)" }}>
      <div className="app-root" style={stretch ? { height: "100%" } : undefined}>
        <div className="app-shell" style={stretch ? { height: "100%" } : undefined}>
          <Navbar workspace={workspace} page={page} credits={credits} />
          <div className="app-body">
            <Rail
              active={shell?.nav ?? nav ?? page}
              expanded={shell?.expanded}
              section={shell?.section}
            />
            <main className="app-main">{children}</main>
          </div>
        </div>
        {panel}
      </div>
    </AbsoluteFill>
  );
};

export { Navbar } from "./navbar";
export { Rail } from "./rail";
