import React from "react";
import { Img, staticFile } from "remotion";
import { CreativeShimmer } from "../../creative";
import { AlertIcon } from "../../icons";
import "./creatives.css";
import { Creative } from "./types";

export const CreativeTile: React.FC<{
  creative: Creative;
  style?: React.CSSProperties;
}> = ({ creative, style }) => (
  <div className="crv-card" style={style}>
    <div className="crv-media" style={{ aspectRatio: creative.aspect }}>
      {creative.status === "generating" ? (
        <CreativeShimmer />
      ) : creative.status === "failed" ? (
        <div className="crv-failed">
          <AlertIcon size={24} />
        </div>
      ) : (
        <Img
          src={staticFile(creative.image as string)}
          style={{ objectPosition: creative.pos }}
        />
      )}
    </div>
    <div className="crv-meta">
      {creative.status === "failed" ? (
        <>
          <span className="crv-name bad">Generation failed</span>
          <span className="crv-note">
            Couldn&apos;t generate this creative. Reword the prompt and try
            again.
          </span>
        </>
      ) : (
        <span className="crv-name">{creative.title}</span>
      )}
    </div>
  </div>
);
