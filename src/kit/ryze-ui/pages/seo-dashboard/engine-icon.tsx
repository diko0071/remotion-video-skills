import React from "react";
import { Img, staticFile } from "remotion";
import "./seo-dashboard.css";

export const EngineIcon: React.FC<{ icon: string; dim?: boolean }> = ({
  icon,
  dim,
}) => <Img className={`sd-eng${dim ? " dim" : ""}`} src={staticFile(icon)} />;
