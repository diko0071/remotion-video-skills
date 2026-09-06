import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

const IMPROVE_PROMPT =
  'Read my programmatic article "Why your candle tunnels and how to fix it" (pseo_articles object id: art_8c2f41) with get_object and give me a short rundown of its title, meta description and body. Then ask me what I want to improve before changing anything.';

export const IMPROVE_TURN: ChatTurn = {
  prompt: IMPROVE_PROMPT,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Read the article",
    rows: [{ name: "objects__get_object" }],
  },
  answer: [
    {
      kind: "p",
      text: "Solid draft — clear structure, strong how-to body. The meta description is the weak spot: it repeats the title instead of selling the fix. Want me to rewrite it, tighten the intro, or both?",
    },
  ],
};

export const PanelThread: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={IMPROVE_TURN} marks={turnMarks(IMPROVE_TURN, from)} frozen={false} />
    </div>
  );
};
