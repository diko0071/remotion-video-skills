import React from "react";
import { Img, staticFile } from "remotion";
import "./chat-empty.css";

export const ChatEmptyHero: React.FC<{
  verb: string;
  rest: string;
  fan: string[];
  fanLeft: number[];
  style?: React.CSSProperties;
}> = ({ verb, rest, fan, fanLeft, style }) => (
  <div className="ce-hero-slot" style={style}>
    <div className="ce-hero">
      <span className="ce-hero-line">
        <span className="ce-verb">
          {verb}
          <span className="ce-underline" />
        </span>
        <span className="ce-fan">
          {fan.map((src, i) => (
            <span
              key={src}
              className="ce-fan-slot"
              style={{ left: fanLeft[i], zIndex: i + 1 }}
            >
              <span className="ce-fan-tile">
                <Img src={staticFile(src)} />
              </span>
            </span>
          ))}
        </span>
      </span>
      <span className="ce-rest">{rest}</span>
    </div>
  </div>
);
