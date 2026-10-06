import React from "react";
import { QuestionTitle } from "../../kit/explainer";
import { K_TITLE } from "./timings";

export const TitleScene: React.FC = () => (
  <QuestionTitle
    lead={[
      { word: "What", at: K_TITLE.what },
      { word: "is", at: K_TITLE.is },
      { word: "Ryze", at: K_TITLE.ryze },
      { word: "for", at: K_TITLE.for },
    ]}
    accent={[
      { word: "Paid", at: K_TITLE.paid },
      { word: "Ads?", at: K_TITLE.ads },
    ]}
  />
);
