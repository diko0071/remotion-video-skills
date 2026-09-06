import React from "react";
import { useReveal } from "../../../../core/motion";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./article-editor.css";
import { ArticleBody } from "./article-body";
import { ARTICLE_EDITOR_FIELDS, ARTICLE_EDITOR_SAVE, ARTICLE_EDITOR_SAVING } from "./data";
import { ArticleDetailsCard } from "./details-card";
import { ArticleTitleInput } from "./editor-head";
import { FeaturedImagePanel } from "./featured-image";
import { SaveButton } from "./save-button";
import type { ArticleDraftFields } from "./types";

const CASCADE = 12;

export const ArticleEditorBody: React.FC<{
  fields?: ArticleDraftFields;
  saving?: boolean;
  revealFrom?: number;
  scrollPx?: number;
  imageSrc?: string;
  bodyBlocks?: React.ComponentProps<typeof ArticleBody>["blocks"];
  afterBody?: React.ReactNode;
  stacked?: boolean;
}> = ({ fields = ARTICLE_EDITOR_FIELDS, saving, revealFrom, scrollPx = 0, imageSrc, bodyBlocks, afterBody, stacked }) => {
  const settled = revealFrom ?? -1e6;
  const head = useReveal(settled, 14);
  const image = useReveal(settled + CASCADE, 18);
  const body = useReveal(settled + CASCADE * 2, 18);
  const side = useReveal(settled + CASCADE * 2, 18);
  return (
    <div className="pg">
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide" style={scrollPx ? { marginTop: -scrollPx } : undefined}>
          <ArticleTitleInput title={fields.title} style={head} />
          <div className={stacked ? "ae-layout stacked" : "ae-layout"}>
            <div className="ae-main">
              <FeaturedImagePanel style={image} src={imageSrc} />
              <ArticleBody style={body} blocks={bodyBlocks} />
              {afterBody}
            </div>
            <div className="ae-side" style={side}>
              <ArticleDetailsCard fields={fields} />
              <SaveButton saving={saving} label={saving ? ARTICLE_EDITOR_SAVING : ARTICLE_EDITOR_SAVE} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArticleEditorPage: React.FC<
  React.ComponentProps<typeof ArticleEditorBody>
> = (props) => (
  <RyzeApp workspace="ember-and-oak" page="Content Plan" nav="Content Plan" stretch>
    <ArticleEditorBody {...props} />
  </RyzeApp>
);
