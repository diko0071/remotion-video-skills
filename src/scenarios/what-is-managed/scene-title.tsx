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
      { word: "Managed", at: K_TITLE.managed },
      { word: "Campaigns?", at: K_TITLE.campaigns },
    ]}
  />
);
