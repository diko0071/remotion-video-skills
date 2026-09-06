import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

const MATCH_TURN: ChatTurn = {
  prompt:
    "Match my hosted blog to my website. Read the hosted-blog-appearance skill first, then look at my live site. Apply my colors, fonts, site name and description, and rebuild the blog's header and footer to match my site's branding.",
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Matched the blog to ember-and-oak.com",
    rows: [
      { name: "web_fetch" },
      { name: "hosted_blog__get_appearance" },
      { name: "hosted_blog__save_appearance" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Done. Pulled your palette from ember-and-oak.com — warm cream background, charcoal text, amber links — set Fraunces for headings to match your site, and rebuilt the blog header with your logo and nav. The preview on the left is already live.",
    },
  ],
};

export const MatchThread: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={MATCH_TURN} marks={turnMarks(MATCH_TURN, from)} frozen={false} />
    </div>
  );
};
