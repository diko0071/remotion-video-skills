import React from "react";
import { useClickPress } from "../../../core/press-context";
import "../../../kit/ryze-ui/pages.css";
import "../../../kit/ryze-ui/pages/competitor-ads/competitor-ads.css";
import { CompetitorAdsHead } from "../../../kit/ryze-ui/pages/competitor-ads/page-head";
import { CompetitorAdsTabs } from "../../../kit/ryze-ui/pages/competitor-ads/tabs";

const UsersGlyph: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const TrackedEmpty: React.FC = () => {
  const scale = useClickPress("comp.discover.open");
  return (
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <CompetitorAdsHead />
          <CompetitorAdsTabs active="Tracked Competitors" />
          <div className="cmp-empty">
            <span className="cmp-empty-icon">
              <UsersGlyph />
            </span>
            <p>No competitors tracked yet. Add one to start pulling their live ads.</p>
            <span
              className="btn-primary"
              data-click="comp.discover.open"
              style={{ scale: String(scale) }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Discover competitors
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
