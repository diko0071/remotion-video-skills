import React from "react";
import { Img, staticFile } from "remotion";
import "./blog-studio.css";
import { BlogArticle } from "./types";

export const GridCard: React.FC<{
  item: BlogArticle;
  style?: React.CSSProperties;
}> = ({ item, style }) => (
  <div className="bs-card" style={style}>
    <Img src={staticFile(item.cover)} />
    <div className="kick">{item.date}</div>
    <h4>{item.title}</h4>
    <p>{item.description}</p>
  </div>
);

export const SideRow: React.FC<{
  item: BlogArticle;
  style?: React.CSSProperties;
}> = ({ item, style }) => (
  <div className="bs-side-row" style={style}>
    <Img src={staticFile(item.cover)} />
    <span className="bs-side-txt">
      <span className="kick">{item.date}</span>
      <b>{item.title}</b>
      <em>{item.description}</em>
    </span>
  </div>
);
