import React from "react";
import { useCurrentFrame } from "remotion";
import { press } from "./motion";

export type ClickPress = { target: string; at: number; press?: boolean };

const bareId = (target: string) => {
  const cut = target.indexOf("//");
  return cut < 0 ? target : target.slice(cut + 2);
};

const ClickPressContext = React.createContext<Map<string, number[]>>(new Map());

export const ClickPressProvider: React.FC<{
  clicks: ClickPress[];
  children: React.ReactNode;
}> = ({ clicks, children }) => {
  const map = React.useMemo(() => {
    const next = new Map<string, number[]>();
    for (const click of clicks) {
      if (click.press === false) continue;
      const id = bareId(click.target);
      const list = next.get(id);
      if (list) list.push(click.at);
      else next.set(id, [click.at]);
    }
    for (const list of next.values()) list.sort((a, b) => a - b);
    return next;
  }, [clicks]);
  return (
    <ClickPressContext.Provider value={map}>
      {children}
    </ClickPressContext.Provider>
  );
};

export const useClickPress = (id: string | undefined): number => {
  const map = React.useContext(ClickPressContext);
  const frame = useCurrentFrame();
  if (!id) return 1;
  const times = map.get(bareId(id));
  if (!times || times.length === 0) return 1;
  let nearest = times[0];
  for (const at of times) {
    if (Math.abs(at - frame) < Math.abs(nearest - frame)) nearest = at;
  }
  return press(frame, nearest);
};
