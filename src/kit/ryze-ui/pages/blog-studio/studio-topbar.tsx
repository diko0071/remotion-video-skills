import React from "react";
import "./blog-studio.css";
import { MonitorGlyph, PhoneGlyph, SlidersGlyph } from "./icons";

export const StudioTopbar: React.FC<{
  domain?: string;
  style?: React.CSSProperties;
  mode?: string;
  domainPopover?: boolean;
}> = ({ domain = "blog.ember-and-oak.com", style, mode = "Design", domainPopover }) => (
  <div className="bs-topbar" style={style}>
    <div className="bs-topleft">
      <span className="bs-sliders">
        <SlidersGlyph />
      </span>
      <span className="bs-seg">
        {["Design", "Code", "SEO"].map((t) => (
          <span
            key={t}
            className={t === mode ? "on" : undefined}
            data-click={`bs.tab.${t}`}
          >
            {t}
          </span>
        ))}
      </span>
    </div>
    <div className="bs-topright">
      <span className="bs-domain-wrap">
        <span className="btn-outline btn-sm" data-click="bs.domain">
          {domain}
        </span>
        {domainPopover ? (
          <span className="bs-domain-pop">
            <span className="bs-domain-url">
              https://{domain}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </span>
            <span className="btn-outline btn-sm btn-block" data-click="bs.domain.custom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              Connect a custom domain
            </span>
          </span>
        ) : null}
      </span>
      <span className="bs-device">
        <i className="on">
          <MonitorGlyph />
        </i>
        <i>
          <PhoneGlyph />
        </i>
      </span>
      <span className="btn-primary btn-sm">Save</span>
    </div>
  </div>
);
