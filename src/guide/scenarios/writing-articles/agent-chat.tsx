import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

export const AGENT_PROMPT =
  "Rewrite the intro so it's punchier and add how much wax tunnelling wastes.";

const EDIT_TURN: ChatTurn = {
  prompt: AGENT_PROMPT,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Edited your article",
    rows: [{ name: "get_object" }, { name: "update_object" }],
  },
  answer: [
    {
      kind: "p",
      text: "Done. The intro now opens on the wasted wax — a tunnelled candle strands up to a third of what you paid for — and I tightened the first two sentences. Saved to the draft.",
    },
  ],
};

export const EditPanelThread: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={EDIT_TURN} marks={turnMarks(EDIT_TURN, from)} frozen={false} />
    </div>
  );
};
