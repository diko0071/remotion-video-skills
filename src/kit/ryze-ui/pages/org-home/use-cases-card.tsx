import React from "react";
import { ArrowRightIcon } from "../../icons";
import "../../pages.css";
import "./org-home.css";
import { OrgTemplateCard } from "./template-card";
import { OrgTemplate } from "./types";

export const OrgUseCasesCard: React.FC<{
  templates: OrgTemplate[];
  title?: string;
  style?: React.CSSProperties;
}> = ({ templates, title = "Explore use cases", style }) => (
  <div className="pg-card oh-cases" style={style}>
    <div className="oh-cases-head">
      <h2>{title}</h2>
      <span className="oh-viewall">
        View all
        <ArrowRightIcon />
      </span>
    </div>
    <div className="oh-grid">
      {templates.map((t) => (
        <OrgTemplateCard key={t.title} template={t} />
      ))}
    </div>
  </div>
);
