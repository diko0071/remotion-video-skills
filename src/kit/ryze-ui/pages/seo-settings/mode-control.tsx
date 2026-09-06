import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./seo-settings.css";
import { PUBLISHING } from "./data";
import type { PublishingMode } from "./types";

const Chevron: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const PublishingModeControl: React.FC<{ mode: PublishingMode }> = ({
  mode,
}) => {
  const autoScale = useClickPress("settings.mode.auto");
  const manualScale = useClickPress("settings.mode.manual");
  return (
    <span
      data-click="settings.mode.manual"
      style={{ display: "inline-flex", scale: String(manualScale) }}
    >
      <span
        className="st-select"
        data-click="settings.mode.auto"
        style={{ scale: String(autoScale) }}
      >
        <span>
          {mode === "auto" ? PUBLISHING.autoLabel : PUBLISHING.manualLabel}
        </span>
        <Chevron />
      </span>
    </span>
  );
};

export const PublishToSelect: React.FC<{ value: string }> = ({ value }) => {
  const scale = useClickPress("settings.publish-to");
  return (
    <span
      className="st-select"
      data-click="settings.publish-to"
      style={{ scale: String(scale) }}
    >
      <span>{value}</span>
      <Chevron />
    </span>
  );
};
