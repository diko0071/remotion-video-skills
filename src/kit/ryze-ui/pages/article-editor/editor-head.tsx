import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { ArrowLeftIcon } from "../../icons";
import "../../pages.css";
import "./article-editor.css";
import { ARTICLE_EDITOR_BACK_LABEL } from "./data";

export const ArticleBackLink: React.FC<{ label?: string }> = ({
  label = ARTICLE_EDITOR_BACK_LABEL,
}) => {
  const scale = useClickPress("editor.back");
  return (
    <span
      className="ae-back"
      data-click="editor.back"
      style={{ scale: String(scale) }}
    >
      <ArrowLeftIcon size={14} />
      {label}
    </span>
  );
};

export const ArticleTitleInput: React.FC<{
  title: string;
  style?: React.CSSProperties;
}> = ({ title, style }) => (
  <div className="ae-head" style={style}>
    <ArticleBackLink />
    <span className="ae-title">{title}</span>
  </div>
);
