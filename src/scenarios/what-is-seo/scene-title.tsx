import React from "react";
import { QuestionTitle } from "../../kit/explainer";
import { K_TITLE } from "./timings";

export const TitleScene: React.FC = () => (
  <QuestionTitle
    lead={[
      { word: "What", at: K_TITLE.what },
      { word: "is", at: K_TITLE.is },
    ]}
    accent={[
      { word: "Ryze", at: K_TITLE.ryze },
      { word: "SEO?", at: K_TITLE.seo },
    ]}
  />
);
