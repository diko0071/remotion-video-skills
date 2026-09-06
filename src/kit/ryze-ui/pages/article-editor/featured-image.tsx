import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import "./article-editor.css";
import {
  ARTICLE_EDITOR_IMAGE,
  ARTICLE_EDITOR_IMAGE_ACTIONS,
  ARTICLE_EDITOR_IMAGE_ALT,
} from "./data";
import { RefreshCwIcon, TrashIcon, UploadIcon } from "./icons";

export const FeaturedImagePanel: React.FC<{
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
}> = ({
  src = ARTICLE_EDITOR_IMAGE,
  alt = ARTICLE_EDITOR_IMAGE_ALT,
  style,
}) => {
  const scale = useClickPress("article.image.regenerate");
  return (
    <div className="ae-image" style={style}>
      <Img src={staticFile(src)} alt={alt} className="ae-image-img" />
      <div className="ae-image-actions">
        <span
          className="ae-image-btn"
          data-click="article.image.regenerate"
          style={{ scale: String(scale) }}
        >
          <RefreshCwIcon />
          {ARTICLE_EDITOR_IMAGE_ACTIONS.regenerate}
        </span>
        <span className="ae-image-btn">
          <UploadIcon />
          {ARTICLE_EDITOR_IMAGE_ACTIONS.replace}
        </span>
        <span
          className="ae-image-btn icon"
          title={ARTICLE_EDITOR_IMAGE_ACTIONS.remove}
        >
          <TrashIcon />
        </span>
      </div>
    </div>
  );
};
