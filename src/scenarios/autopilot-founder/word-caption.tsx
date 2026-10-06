import React from "react";
import { Sequence } from "remotion";
import { Pop } from "../../kit/pop";
import { ACCENT, CAPTION_Y, FONT } from "./theme";

export const WordCaption: React.FC<{ words: { text: string; at: number }[]; until: number }> = ({ words, until }) => (
  <>
    {words.map((w, i) => {
      const end = i < words.length - 1 ? words[i + 1].at : until;
      if (end <= w.at) return null;
      return (
        <Sequence key={`${w.text}-${w.at}`} from={w.at} durationInFrames={end - w.at} layout="none">
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 1080,
              top: CAPTION_Y,
              textAlign: "center",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 72,
              letterSpacing: "-0.01em",
              color: ACCENT,
            }}
          >
            <Pop at={0} from={0.7} rise={14}>
              {w.text}
            </Pop>
          </div>
        </Sequence>
      );
    })}
  </>
);
