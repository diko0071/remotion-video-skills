import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./blog-studio.css";

const StepDot: React.FC<{ index: number; done?: boolean }> = ({ index, done }) => (
  <span className={done ? "bs-step-dot done" : "bs-step-dot"}>
    {done ? (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ) : (
      index
    )}
  </span>
);

export const StudioSeoPane: React.FC<{
  verified?: boolean;
  checking?: boolean;
  style?: React.CSSProperties;
}> = ({ verified, checking, style }) => {
  const checkScale = useClickPress("bs.seo.check");
  return (
    <div className="bs-panel" style={style}>
      <div className="bs-sec">
        <p className="bs-hint intro">
          Verify once — we submit the sitemap and keep Google updated on every
          publish.
        </p>
      </div>
      <div className="bs-sec">
        <div className="bs-step-head">
          <StepDot index={1} done={verified} />
          <span className="bs-step-title">Verify your blog in Search Console</span>
          {verified ? <span className="bs-badge ok">Verified</span> : null}
        </div>
        <p className="bs-hint">
          Add this URL as a property in Search Console and verify it there.
          Already verified your root domain as a Domain property? The blog is
          covered automatically.
        </p>
        <span className="btn-outline btn-sm btn-block">Open Search Console</span>
        <span
          className="btn-primary btn-sm btn-block"
          data-click="bs.seo.check"
          style={{ scale: String(checkScale) }}
        >
          {checking ? "Checking…" : "Check verification"}
        </span>
      </div>
      <div className="bs-sec">
        <div className="bs-step-head">
          <StepDot index={2} done={verified} />
          <span className="bs-step-title">Sitemap submitted for you</span>
        </div>
        <p className="bs-hint">
          Once verified, Ryze submits the sitemap and pings Google on every
          single publish — you never touch Search Console again.
        </p>
      </div>
      <div className="bs-sec">
        <div className="bs-step-head">
          <StepDot index={3} />
          <span className="bs-step-title">Link your blog from your main site</span>
        </div>
        <p className="bs-hint">
          Add a link to the blog in your site's navigation or footer. An
          orphaned subdomain crawls slowly — one link from your ranking domain
          fixes it.
        </p>
      </div>
    </div>
  );
};
