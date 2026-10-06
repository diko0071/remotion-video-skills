import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { FONT } from "./theme";

export const useFontReady = () => {
  const [handle] = useState(() => delayRender("o-full-stop font"));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    FONT.waitUntilDone().then(() => {
      setReady(true);
      continueRender(handle);
    });
  }, [handle]);
  return ready;
};
