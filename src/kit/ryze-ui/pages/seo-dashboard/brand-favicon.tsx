import React from "react";
import { Img, staticFile } from "remotion";
import "./seo-dashboard.css";
import { FAVICONS } from "./data";

export const BrandFavicon: React.FC<{ domain: string; initials: string }> = ({
  domain,
  initials,
}) => {
  const file = FAVICONS[domain];
  if (!file) return <span className="sd-fav-fb">{initials}</span>;
  return <Img className="sd-fav" src={staticFile(file)} />;
};
