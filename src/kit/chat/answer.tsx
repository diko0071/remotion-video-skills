import React from "react";
import { Markdown } from "../ryze-ui/message";
import type { AnswerBlock } from "./types";

const inline = (text: string): React.ReactNode[] =>
  text.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>,
  );

const Block: React.FC<{ block: AnswerBlock }> = ({ block }) => {
  if (block.kind === "p") return <p>{inline(block.text)}</p>;
  if (block.kind === "heading")
    return (
      <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
        {inline(block.text)}
      </p>
    );
  return (
    <ul>
      {block.items.map((item, i) => (
        <li key={i}>{inline(item)}</li>
      ))}
    </ul>
  );
};

export const ChatAnswerBlocks: React.FC<{ blocks: AnswerBlock[] }> = ({ blocks }) => (
  <Markdown>
    {blocks.map((block, i) => (
      <Block key={i} block={block} />
    ))}
  </Markdown>
);
