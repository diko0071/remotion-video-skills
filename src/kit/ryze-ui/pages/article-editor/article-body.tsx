import React from "react";
import "./article-editor.css";
import { ARTICLE_EDITOR_BODY } from "./data";
import type { ArticleBodyBlock } from "./types";

export const ArticleBody: React.FC<{
  blocks?: ArticleBodyBlock[];
  style?: React.CSSProperties;
}> = ({ blocks = ARTICLE_EDITOR_BODY, style }) => (
  <div className="ae-body" data-click="editor.body" style={style}>
    {blocks.map((block) =>
      block.kind === "h2" ? (
        <h2 className="ae-body-h2" key={block.text}>
          {block.text}
        </h2>
      ) : (
        <p className="ae-body-p" key={block.text}>
          {block.link && block.text.includes(block.link.anchor) ? (
            <>
              {block.text.split(block.link.anchor)[0]}
              <span
                className="ae-body-link"
                {...(block.link.highlightId
                  ? { "data-click": block.link.highlightId }
                  : {})}
              >
                {block.link.anchor}
              </span>
              {block.text.split(block.link.anchor)[1]}
            </>
          ) : (
            block.text
          )}
        </p>
      ),
    )}
  </div>
);
