import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { RyzeApp } from "../../kit/ryze-ui/app-shell";
import { Composer } from "../../kit/ryze-ui/chat";
import { P } from "./timings";

const PROMPT = "Fix my AI visibility";

export const TypeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, P.typeStart, P.typeEnd);
  return (
    <AbsoluteFill>
      <RyzeApp workspace="emberandoak">
        <div className="empty-wrap">
          <div className="empty-inner">
            <div className="welcome">
              <h1>What should we look at today?</h1>
            </div>
            <Composer typed={typed} cursor={blink(frame)} sendScale={press(frame, P.send)} />
          </div>
        </div>
      </RyzeApp>
    </AbsoluteFill>
  );
};
