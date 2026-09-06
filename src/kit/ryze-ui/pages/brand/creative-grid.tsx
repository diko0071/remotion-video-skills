import React from "react";
import { Img, staticFile } from "remotion";
import "./brand.css";

export const BrandCreativeGrid: React.FC<{ sources: string[] }> = ({
  sources,
}) => (
  <div className="br-creatives">
    {sources.map((src) => (
      <div className="br-creative" key={src}>
        <Img src={staticFile(src)} alt="" />
      </div>
    ))}
  </div>
);
