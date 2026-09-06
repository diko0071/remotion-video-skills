import React from "react";
import { Img, staticFile } from "remotion";
import "./report-detail.css";
import { Slide } from "./slide";

export const CoverSlide: React.FC<{
  logo?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  scope?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  logo = "product-1.jpg",
  title = <>Ember &amp; Oak — August performance review</>,
  description = "Revenue, acquisition and SEO for ember-and-oak.com, with the fixes that move September.",
  scope = "Aug 1-31, 2026 vs Jul 1-31, 2026 · Shopify, GA4, Search Console, DataForSEO",
  style,
}) => (
  <Slide cover style={style}>
    <div className="rd-cover">
      <span className="rd-cover-logo">
        <Img src={staticFile(logo)} />
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="rd-cover-scope">{scope}</div>
    </div>
  </Slide>
);
