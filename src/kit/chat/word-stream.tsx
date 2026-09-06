import React from "react";
import { useCurrentFrame } from "remotion";
import { Markdown } from "../ryze-ui/message";

export type StreamWord = { text: string; bold: boolean };

export const streamWords = (text: string): StreamWord[] =>
  text.split(" ").map((raw) => ({
    text: raw.split("**").join(""),
    bold: raw.startsWith("**"),
  }));

export const WordStream: React.FC<{
  words: StreamWord[];
  from: number;
  rate?: number;
}> = ({ words, from, rate = 3.6 }) => {
  const frame = useCurrentFrame();
  const progress = (frame - from) / rate;
  if (progress <= 0) return null;
  return (
    <Markdown>
      <p>
        {words.map((word, i) => (
          <span
            key={i}
            style={{ opacity: Math.max(0, Math.min(1, (progress - i) / 1.6)) }}
          >
            {word.bold ? <strong>{word.text}</strong> : word.text}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </Markdown>
  );
};
