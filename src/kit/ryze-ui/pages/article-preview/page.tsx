import React from "react";
import { Img, staticFile } from "remotion";
import { useReveal } from "../../../../core/motion";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./article-preview.css";
import { ArticleBody } from "../article-editor/article-body";
import { ARTICLE_EDITOR_FIELDS } from "../article-editor/data";
import { ArticleScoreCard } from "../article-editor/score-card";
import { ArticleMetaCard } from "./meta-card";
import { ArticlePreviewHeader } from "./header";

const CASCADE = 12;

export const ArticlePreviewBody: React.FC<{
  revealFrom?: number;
  published?: boolean;
  bodyBlocks?: React.ComponentProps<typeof ArticleBody>["blocks"];
  imageSrc?: string;
  scrollPx?: number;
}> = ({ revealFrom, published, imageSrc = "hero-candles.jpg", bodyBlocks, scrollPx = 0 }) => {
  const settled = revealFrom ?? -1e6;
  const head = useReveal(settled, 14);
  const body = useReveal(settled + CASCADE, 18);
  const side = useReveal(settled + CASCADE * 2, 18);
  return (
    <div className="pg">
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide" style={{ marginTop: -scrollPx }}>
          <ArticlePreviewHeader
            title={ARTICLE_EDITOR_FIELDS.title}
            published={published}
            style={head}
          />
          <div className="ap-layout">
            <div className="ap-main" style={body}>
              <div className="ap-hero">
                <Img src={staticFile(imageSrc)} />
              </div>
              <ArticleBody blocks={bodyBlocks} />
            </div>
            <div className="ap-side" style={side}>
              <ArticleScoreCard />
              <ArticleMetaCard status={published ? "Published" : undefined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArticlePreviewPage: React.FC<
  React.ComponentProps<typeof ArticlePreviewBody>
> = (props) => (
  <RyzeApp workspace="ember-and-oak" page="Content Plan" nav="Content Plan" stretch>
    <ArticlePreviewBody {...props} />
  </RyzeApp>
);
