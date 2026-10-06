import React from "react";
import { ApprovalsFeed, APPROVALS_FEED_TOTAL } from "../approvals-feed";
import { SceneStyleProvider } from "../approvals/style";

export const APPROVALS_FEED_2_TOTAL = APPROVALS_FEED_TOTAL;

export const ApprovalsFeed2: React.FC = () => (
  <SceneStyleProvider value={{ textScale: 1.2, lineWidth: 8 }}>
    <ApprovalsFeed />
  </SceneStyleProvider>
);
