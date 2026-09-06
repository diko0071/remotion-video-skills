import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

const IMPROVE_TURN: ChatTurn = {
  prompt:
    "Pull my brand profile and give me a short rundown of what's there — flag anything weak or missing. Then ask me what I want to improve before changing anything.",
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Read your brand profile",
    rows: [{ name: "brand__get_brand" }],
  },
  answer: [
    {
      kind: "p",
      text: "Solid foundation: the offer, industry and tone of voice are specific, and the agent notes you just added give me clear rules. Two weak spots — the visual palette has no usage notes (when to use Sale red vs Accent brown), and there are no blog examples, so article style leans on tone-of-voice text alone.",
    },
    {
      kind: "p",
      text: "Want me to draft palette usage notes, or pull your three best-performing posts in as blog examples?",
    },
  ],
};

export const ImprovePanelThread: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={IMPROVE_TURN} marks={turnMarks(IMPROVE_TURN, from)} frozen={false} />
    </div>
  );
};
