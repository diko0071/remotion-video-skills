import React from "react";
import { ArrowUpRightIcon } from "../../ryze-ui/icons";
import "../../ryze-ui/pages/chat-artifact/chat-artifact.css";
import type { ChatArtifact } from "../types";

const stroke = (paths: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {paths}
  </svg>
);

const DashboardTypeIcon: React.FC = () =>
  stroke(
    <>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </>,
  );

const DeckTypeIcon: React.FC = () =>
  stroke(
    <>
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </>,
  );

const SiteTypeIcon: React.FC = () =>
  stroke(
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </>,
  );

const TYPE_LABEL: Record<ChatArtifact["kind"], string> = {
  dashboard: "Dashboard",
  deck: "Deck",
  browser: "Live preview",
  custom: "Artifact",
};

export const ArtifactCard: React.FC<{ artifact: ChatArtifact }> = ({ artifact }) => (
  <span className="ca-card">
    <span className="ca-card-icon">
      {artifact.kind === "deck" ? (
        <DeckTypeIcon />
      ) : artifact.kind === "browser" ? (
        <SiteTypeIcon />
      ) : (
        <DashboardTypeIcon />
      )}
    </span>
    <span className="ca-card-text">
      <span className="ca-card-name">{artifact.name}</span>
      <span className="ca-card-type">{TYPE_LABEL[artifact.kind]}</span>
    </span>
    <ArrowUpRightIcon size={16} />
  </span>
);
