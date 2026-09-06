import React from "react";
import { Img, staticFile } from "remotion";

export const TILE_IMG_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top center",
  display: "block",
};

export const TileImg: React.FC<{
  file: string;
  height?: number | string;
}> = ({ file, height }) => (
  <Img
    src={staticFile(file)}
    style={height === undefined ? TILE_IMG_STYLE : { ...TILE_IMG_STYLE, height }}
  />
);
