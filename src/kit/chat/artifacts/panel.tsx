import React from "react";
import type { ChatArtifact } from "../types";
import { BrowserArtifact } from "./browser";
import { DashboardArtifact } from "./dashboard";
import { DeckArtifact } from "./deck";

export const isSiteArtifact = (artifact: ChatArtifact): boolean =>
  artifact.kind === "browser" || (artifact.kind === "custom" && artifact.site === true);

export const ArtifactPanelBody: React.FC<{ artifact: ChatArtifact }> = ({ artifact }) => {
  if (artifact.kind === "browser") return <BrowserArtifact site={artifact.site} />;
  if (artifact.kind === "dashboard") return <DashboardArtifact dashboard={artifact.dashboard} />;
  if (artifact.kind === "deck") return <DeckArtifact deck={artifact.deck} />;
  const Render = artifact.Render;
  return <Render />;
};
