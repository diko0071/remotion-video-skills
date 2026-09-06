import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

const FIX_TURN: ChatTurn = {
  prompt:
    "Run the technical audit fixes: go through the issues found on my site and fix everything you can through the CMS.",
  instant: true,
  reasoning: { seconds: 3 },
  tools: {
    summary: "Applied 9 fixes across the site",
    rows: [
      { name: "shopify__edit_content" },
      { name: "shopify__write" },
      { name: "shopify__edit_content" },
      { name: "google_search_console__inspectUrl" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Done — 9 fixes applied. Created llms.txt, unblocked AI crawlers in robots.txt, added Organization and WebSite schema, 301-redirected the dead wholesale page to /pages/wholesale, and cleaned up the broken internal links pointing at it.",
    },
    {
      kind: "p",
      text: "Two things need your word before I touch them: compressing the hero images on 3 collection pages, and rewriting 4 thin meta descriptions. Say the word and I'll do both.",
    },
  ],
};

export const FixPanelThread: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={FIX_TURN} marks={turnMarks(FIX_TURN, from)} frozen={false} />
    </div>
  );
};
