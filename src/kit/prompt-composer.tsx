import React from "react";
import { useCurrentFrame } from "remotion";
import { blink, press, typing } from "../core/motion";
import { Composer } from "./ryze-ui/chat";

export type PromptSpec = {
  text: string;
  typeWindow: readonly [number, number];
  sendAt: number;
};

export const PromptComposer: React.FC<{
  prompts: PromptSpec[];
  attachment?: React.ReactNode;
  placeholder?: string;
}> = ({ prompts, attachment, placeholder }) => {
  const frame = useCurrentFrame();

  const active = prompts.find((p) => frame < p.sendAt + 2);
  const typed = active
    ? typing(frame, active.text, active.typeWindow[0], active.typeWindow[1])
    : "";
  const cursor = active
    ? frame >= active.typeWindow[0] - 10 && frame < active.sendAt && blink(frame)
    : false;
  const sendScale = prompts.reduce((scale, p) => scale * press(frame, p.sendAt), 1);

  return (
    <Composer typed={typed} cursor={cursor} sendScale={sendScale} attachment={attachment} placeholder={placeholder} />
  );
};
