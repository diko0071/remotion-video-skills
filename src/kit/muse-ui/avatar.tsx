import React from "react";
import { Img, staticFile } from "remotion";
import "./muse.css";
import { ToolsIcon } from "./icons";

export type MuseMood = "idle" | "working";

export const MUSE_HEAD = "muse/polly-head.png";
export const MUSE_WORKING = "muse/polly-working.png";
export const MUSE_BODY = "muse/polly-body.png";

export const MuseAvatar: React.FC<{
  size: number;
  mood?: MuseMood;
  style?: React.CSSProperties;
  id?: string;
}> = ({ size, mood = "idle", style, id }) => (
  <div className="mu-avatar" style={{ width: size, height: size, ...style }} data-click={id}>
    <Img src={staticFile(MUSE_HEAD)} style={{ opacity: mood === "idle" ? 1 : 0 }} />
    <Img src={staticFile(MUSE_WORKING)} style={{ position: "absolute", inset: 0, opacity: mood === "working" ? 1 : 0 }} />
  </div>
);

export const MuseFloat: React.FC<{
  name?: string;
  mood?: MuseMood;
  status?: string;
  statusIcon?: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  id?: string;
}> = ({ name = "Muse", mood = "idle", status, statusIcon, size = 66, style, id }) => (
  <div className="mu-float" style={style} data-click={id}>
    <MuseAvatar size={size} mood={mood} />
    <div className="mu-avatar-label">
      {name}
      {status ? (
        <span className="mu-avatar-status">
          {statusIcon ?? <ToolsIcon size={13} />}
          {status}
        </span>
      ) : null}
    </div>
  </div>
);
