import React from "react";
import { continueRender, delayRender } from "remotion";
import { loadFont } from "@remotion/fonts";

export type LocalFont = { family: string; url: string; weight: string };

export const useLocalFonts = (fonts: readonly LocalFont[]) => {
  const [handle] = React.useState(() => delayRender("local fonts"));
  React.useEffect(() => {
    Promise.all(fonts.map((f) => loadFont(f))).then(() => continueRender(handle));
  }, [fonts, handle]);
};
