import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, ramp, typing } from "../../core/motion";
import { ClaudeComposer } from "./composer";
import { ClaudeFrame, ClaudeWelcome } from "./frame";
import { ClaudeSidebar } from "./sidebar";

export const ClaudeWelcomeStage: React.FC<{
  prompt: string;
  type: { click: number; from: number; to: number };
  send: { hover: number; press: number };
  model: string;
  modelVariant: string;
  welcome: { y: number; composerY: number; composerW: number };
  ui: { w: number; h: number; scale: number };
  background: string;
  greeting?: string;
}> = ({ prompt, type, send, model, modelVariant, welcome, ui, background, greeting = "Welcome back" }) => {
  const frame = useCurrentFrame();
  const typed = typing(frame, prompt, type.from, type.to);
  const focused = frame >= type.click;
  const pressed = press(frame, send.press, 0.9);
  const hoverIn = ramp(frame, send.hover, send.hover + 8);
  const breathe = 0.42 + 0.18 * Math.sin((frame - send.hover) * 0.42);
  const pressGlow = frame >= send.press ? 1 - ramp(frame, send.press + 2, send.press + 14) : 0;
  const glow = Math.max(hoverIn * breathe, pressGlow);
  const shine = frame >= send.press ? 1 - ramp(frame, send.press, send.press + 10) : frame >= send.hover ? ((frame - send.hover) % 26) / 26 : 0;
  return (
    <AbsoluteFill style={{ background }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: ui.w, height: ui.h, transform: `scale(${ui.scale})`, transformOrigin: "0 0" }}>
        <ClaudeFrame header={false} sidebar={<ClaudeSidebar activeNav="New" />} style={{ background }}>
          <div style={{ position: "relative", flex: 1 }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "absolute", top: welcome.y }}>
                <ClaudeWelcome text={greeting} />
              </div>
              <div style={{ position: "absolute", top: welcome.composerY, width: welcome.composerW }}>
                <ClaudeComposer typed={typed} cursor={focused && frame < send.press && blink(frame)} placeholder={focused ? "" : "How can I help you today?"} send={typed.length > 0} sendPressed={pressed} sendGlow={glow} sendShine={shine} model={model} modelVariant={modelVariant} />
              </div>
            </div>
          </div>
        </ClaudeFrame>
      </div>
    </AbsoluteFill>
  );
};
