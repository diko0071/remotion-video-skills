import React from "react";
import { Img, staticFile } from "remotion";
import "./blog-studio.css";
import { GridCard, SideRow } from "./article-cards";
import { ArrowUpRightGlyph } from "./icons";
import { BlogArticle } from "./types";

export const StudioPreview: React.FC<{
  feature: BlogArticle;
  side: BlogArticle[];
  rest: BlogArticle[];
  brand?: string;
  style?: React.CSSProperties;
  dark?: boolean;
  matched?: boolean;
}> = ({ feature, side, rest, brand = "Ember & Oak", style, dark, matched }) => (
  <div className="bs-preview" style={style}>
    <div className={dark ? "bs-site dark" : "bs-site"}>
      <div className="bs-site-head">
        <div className="bs-site-nav">
          <span className="bs-brand">
            <span className="mark">E</span>
            <b>{brand}</b>
          </span>
          {matched ? (
            <span className="bs-site-links">
              <span>Shop</span>
              <span>Our Story</span>
              <span className="on">Journal</span>
              <span>Contact</span>
              <span className="bs-site-cta">Shop candles</span>
            </span>
          ) : (
            <span className="bs-visit">
              Visit website
              <ArrowUpRightGlyph />
            </span>
          )}
        </div>
      </div>

      <div className="bs-wrap">
        <div className="bs-hero">
          <div className="bs-feature">
            <Img src={staticFile(feature.cover)} />
            <span className="bs-feature-shade" />
            <span className="bs-feature-txt">
              <span className="bs-date-pill">{feature.date}</span>
              <h1>{feature.title}</h1>
              <p>{feature.description}</p>
            </span>
          </div>
          <div className="bs-side">
            {side.map((item) => (
              <SideRow key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="bs-all">
          <h2>All articles</h2>
          <div className="bs-cards">
            {rest.map((item) => (
              <GridCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
