import React from "react";
import type { ChatResult } from "../types";
import { ArticleResult } from "./article";
import { ChartResult } from "./chart";
import { CreativeGridResult } from "./creatives";
import { MetricsResult } from "./metrics";
import { ProposalResult } from "./proposal";

export const ChatResultBlock: React.FC<{ result: ChatResult }> = ({ result }) => {
  if (result.kind === "chart")
    return <ChartResult title={result.title} subtitle={result.subtitle} spec={result.chart} />;
  if (result.kind === "creatives")
    return (
      <CreativeGridResult
        title={result.title}
        subtitle={result.subtitle}
        items={result.items}
        tile={result.tile}
      />
    );
  if (result.kind === "proposal")
    return (
      <ProposalResult
        title={result.title}
        subtitle={result.subtitle}
        rows={result.rows}
        approveLabel={result.approveLabel}
        rejectLabel={result.rejectLabel}
      />
    );
  if (result.kind === "metrics")
    return <MetricsResult title={result.title} subtitle={result.subtitle} items={result.items} />;
  if (result.kind === "article")
    return (
      <ArticleResult
        title={result.title}
        subtitle={result.subtitle}
        heading={result.heading}
        meta={result.meta}
        paragraphs={result.paragraphs}
      />
    );
  const Render = result.Render;
  return <Render />;
};
