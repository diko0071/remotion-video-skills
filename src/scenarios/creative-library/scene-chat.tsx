import React from "react";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { CreativeGridResult } from "../../kit/chat/results/creatives";
import { FAVORITES, PROMPT } from "./timings";

const ANSWER =
  "Built three from the winners you picked — **your brand**, their playbook. Want me to launch them as a Meta test set?";
const MARKS = { ...chatSceneMarks(ANSWER, { wordRate: 4.4 }), bubbleAt: -14, sparkAt: 4 };

export const LIBRARY_CHAT_TOTAL = MARKS.scrollOutAt;
export const LIBRARY_CHAT_RESULT_AT = MARKS.resultAt;

const ITEMS = [
  { name: "Night score", caption: "Hero · midnight", file: "dusk/gen/lib1.png" },
  { name: "Deep sleep", caption: "Data · hypnogram", file: "dusk/gen/lib2.png" },
  { name: "First 14 nights", caption: "Offer · CTA", file: "dusk/gen/lib3.png" },
];

export const LibraryChat: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    wordRate={4.4}
    attachments={FAVORITES}
    result={
      <CreativeGridResult
        title="New creatives — from the library"
        subtitle="Synthesized from 4 winning references"
        items={ITEMS}
      />
    }
  />
);
