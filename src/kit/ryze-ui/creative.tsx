import React from "react";
import { useCurrentFrame } from "remotion";
import { useClickPress } from "../../core/press-context";
import { AnnotateIcon, DownloadIcon, ExpandDiagIcon } from "./icons";

export const AdMock: React.FC<{
  light?: boolean;
  badge: string;
  headline: string;
  sub: string;
  cta: string;
}> = ({ light, badge, headline, sub, cta }) => (
  <div className={`ad-mock${light ? " light" : ""}`}>
    <span className="badge">{badge}</span>
    <div>
      <div className="headline">{headline}</div>
      <div className="sub">{sub}</div>
      <div className="cta">{cta}</div>
    </div>
  </div>
);

export const CreativeActions: React.FC<{ annotateId?: string }> = ({ annotateId }) => {
  const scale = useClickPress(annotateId ?? "");
  return (
  <div className="creative-actions">
    <span
      className="cact"
      {...(annotateId
        ? { "data-click": annotateId, style: { scale: String(scale) } }
        : {})}
    >
      <AnnotateIcon size={14} />
    </span>
    <span className="cact">
      <ExpandDiagIcon size={14} />
    </span>
    <span className="cact">
      <DownloadIcon size={14} />
    </span>
  </div>
  );
};

export const CreativeShimmer: React.FC = () => {
  const frame = useCurrentFrame();
  const x = ((frame % 42) / 42) * 200 - 100;
  return (
    <div className="creative-shimmer">
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${x}%)`,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
        }}
      />
    </div>
  );
};

export const CreativeCard: React.FC<{
  name: string;
  caption: string;
  image: React.ReactNode;
  actions?: boolean;
  annotateId?: string;
  style?: React.CSSProperties;
}> = ({ name, caption, image, actions, annotateId, style }) => (
  <div className="creative-card" style={style}>
    <div className="creative-img">
      {image}
      {actions ? <CreativeActions annotateId={annotateId} /> : null}
    </div>
    <div className="creative-meta">
      <div className="creative-name">{name}</div>
      <div className="creative-caption">{caption}</div>
    </div>
  </div>
);
