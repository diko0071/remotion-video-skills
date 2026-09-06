import React from "react";
import { Img, staticFile } from "remotion";
import "../../pages.css";
import "./org-home.css";
import { OrgTemplate } from "./types";

export const OrgTemplateCard: React.FC<{
  template: OrgTemplate;
  style?: React.CSSProperties;
}> = ({ template, style }) => (
  <div className="tpl-card" style={style}>
    <div className="tpl-cover">
      <Img src={staticFile(`templates/${template.imageFile}`)} />
      <span className="tpl-badge">
        <Img src={staticFile(`integrations/${template.platformLogo}`)} />
        {template.platformLabel}
      </span>
    </div>
    <div className="tpl-body">
      <div className="tpl-title">{template.title}</div>
      <div className="tpl-desc">{template.description}</div>
    </div>
  </div>
);
