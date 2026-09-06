import React from "react";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { CreativeGridResult } from "../../kit/chat/results/creatives";
import { CREATIVES, PROMPT } from "./timings";

const ANSWER =
  "Three new creatives in your **brand style** — same warm palette, fresh hooks. Want me to launch them as a Meta test set?";
const MARKS = chatSceneMarks(ANSWER);

export const CREATIVES_CHAT_TOTAL = MARKS.total;

const ITEMS = [
  { name: "Night score", caption: "Hero · midnight", file: "dusk/gen/ask1.png" },
  { name: "Deep sleep", caption: "Data · hypnogram", file: "dusk/gen/ask2.png" },
  { name: "First 14 nights", caption: "Offer · CTA", file: "dusk/gen/ask3.png" },
];

export const CreativesChat: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    attachments={CREATIVES}
    result={
      <CreativeGridResult
        title="New creatives — Dusk"
        subtitle="Generated from your 4 best performers"
        items={ITEMS}
      />
    }
  />
);
