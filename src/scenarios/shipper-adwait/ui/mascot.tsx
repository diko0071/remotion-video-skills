import React from "react";
import { Img, staticFile } from "remotion";

export const Mascot: React.FC<{ width?: number }> = ({ width = 320 }) => (
  <Img src={staticFile("shipper/clawd-static.svg")} style={{ width }} />
);
