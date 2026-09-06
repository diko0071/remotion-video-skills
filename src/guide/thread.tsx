import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../kit/chat";
import "../kit/chat/chat.css";

export type ThreadEntry = { turn: ChatTurn; at: number };

export const GuideThread: React.FC<{ entries: ThreadEntry[] }> = ({ entries }) => {
  const frame = useCurrentFrame();
  return (
    <div className="guide-thread">
      {entries
        .filter(({ at }) => frame >= at - 2)
        .map(({ turn, at }) => (
          <ChatTurnBlock key={at} turn={turn} marks={turnMarks(turn, at)} frozen={false} />
        ))}
    </div>
  );
};
