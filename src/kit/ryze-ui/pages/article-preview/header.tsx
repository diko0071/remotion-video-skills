import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { SparkIcon } from "../../icons";
import { ArrowLeftGlyph } from "./icons";
import "./article-preview.css";
import {
  PREVIEW_BACK_LABEL,
  PREVIEW_EDIT_CTA,
  PREVIEW_IMPROVE_CTA,
  PREVIEW_PUBLISH_CTA,
} from "./data";

export const ArticlePreviewHeader: React.FC<{
  title: string;
  published?: boolean;
  style?: React.CSSProperties;
}> = ({ title, published, style }) => {
  const backScale = useClickPress("preview.back");
  const improveScale = useClickPress("article.improve");
  const editScale = useClickPress("preview.edit");
  const publishScale = useClickPress("article.publish");
  return (
    <div className="ap-head" style={style}>
      <span className="ap-back" data-click="preview.back" style={{ scale: String(backScale) }}>
        <ArrowLeftGlyph />
        {PREVIEW_BACK_LABEL}
      </span>
      <div className="ap-head-row">
        <h1 className="ap-title">{title}</h1>
        <div className="ap-actions">
          <span
            className="btn-outline"
            data-click="article.improve"
            style={{ scale: String(improveScale) }}
          >
            <SparkIcon />
            {PREVIEW_IMPROVE_CTA}
          </span>
          <span
            className="btn-outline"
            data-click="preview.edit"
            style={{ scale: String(editScale) }}
          >
            {PREVIEW_EDIT_CTA}
          </span>
          <span
            className="btn-primary"
            data-click="article.publish"
            style={{ scale: String(publishScale) }}
          >
            {published ? "Published" : PREVIEW_PUBLISH_CTA}
          </span>
        </div>
      </div>
    </div>
  );
};
