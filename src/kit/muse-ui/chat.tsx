import React from "react";
import { Img, staticFile } from "remotion";
import "./muse.css";
import { CardIcon, CheckCircleIcon, ChevronIcon, ExpandIcon } from "./icons";

export const MuseThread: React.FC<{ children: React.ReactNode; anchored?: boolean; style?: React.CSSProperties }> = ({ children, anchored, style }) => (
  <div className={"mu-thread" + (anchored ? " anchored" : "")} style={style}>
    <div className="mu-col">{children}</div>
  </div>
);

export const MuseDay: React.FC<{ text: string }> = ({ text }) => <div className="mu-day">{text}</div>;

export const MuseBubble: React.FC<{
  user?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}> = ({ user, children, style, id }) => (
  <div className={"mu-bubble" + (user ? " user" : "")} style={style} data-click={id}>
    {children}
  </div>
);

export const MuseSuggestCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  body: string;
  style?: React.CSSProperties;
  id?: string;
}> = ({ icon, title, body, style, id }) => (
  <div className="mu-suggest" style={style} data-click={id}>
    <span className="mu-suggest-icon">{typeof icon === "string" ? <Img src={staticFile(icon)} /> : icon}</span>
    <span>
      <div className="mu-suggest-title">{title}</div>
      <div className="mu-suggest-body">{body}</div>
    </span>
  </div>
);

export const MuseArtifactThumb: React.FC<{ file?: string; children?: React.ReactNode; style?: React.CSSProperties; id?: string }> = ({ file, children, style, id }) => (
  <div className="mu-artifact" style={style} data-click={id}>
    {file ? <Img src={staticFile(file)} /> : <div className="mu-artifact-phone">{children}</div>}
  </div>
);

export const MuseTyping: React.FC<{ frame: number; style?: React.CSSProperties }> = ({ frame, style }) => (
  <div className="mu-typing" style={style}>
    {[0, 1, 2].map((i) => {
      const t = ((frame / 8 - i * 0.55) % 3 + 3) % 3;
      const on = t < 1 ? t : t < 2 ? 2 - t : 0;
      return <span key={i} style={{ background: `rgba(120,120,126,${0.35 + on * 0.55})` }} />;
    })}
  </div>
);

export type ApprovalItem = { thumb: React.ReactNode; name: string; sub: string };

export const MuseApprovalCard: React.FC<{
  icon?: React.ReactNode;
  logo?: string;
  title: string;
  sub: string;
  items?: ApprovalItem[];
  action?: string;
  payTitle?: string;
  paySub?: React.ReactNode;
  payIcon?: React.ReactNode;
  totalLabel?: string;
  total?: string;
  deny?: string;
  allow?: string;
  allowId?: string;
  approved?: boolean;
  width?: number;
  style?: React.CSSProperties;
  id?: string;
}> = ({ icon, logo, title, sub, items = [], action, payTitle, paySub, payIcon, totalLabel = "Estimated total", total, deny = "Deny", allow = "Allow", allowId, approved = false, width, style, id }) => (
  <div className="mu-approval" style={{ ...(width ? { width } : null), ...style }} data-click={id}>
    <div className="mu-approval-head">
      {logo ? (
        <span className="mu-approval-logo">
          <Img src={staticFile(logo)} />
        </span>
      ) : (
        icon
      )}
      {title}
    </div>
    <div className="mu-approval-sub">{sub}</div>
    {items.length ? (
      <div className="mu-approval-box">
        {items.map((it, i) => (
          <div key={i} className="mu-approval-item">
            <span className="mu-approval-thumb">{typeof it.thumb === "string" ? <Img src={staticFile(it.thumb)} /> : it.thumb}</span>
            <span style={{ minWidth: 0 }}>
              <div className="mu-approval-name">{it.name}</div>
              <div className="sub">{it.sub}</div>
            </span>
          </div>
        ))}
        {action ? (
          <div className="mu-approval-pill">
            <span className="m">M</span>
            {action}
            <ExpandIcon size={18} />
          </div>
        ) : null}
      </div>
    ) : null}
    {payTitle ? (
      <div className="mu-approval-pay">
        {payIcon ?? <CardIcon size={30} />}
        <span style={{ flex: 1 }}>
          <div className="mu-approval-pay-title">{payTitle}</div>
          {paySub ? <div className="mu-approval-pay-sub">{paySub}</div> : null}
        </span>
        <ChevronIcon size={18} />
      </div>
    ) : null}
    {total ? (
      <div className="mu-approval-total">
        <span className="lab">{totalLabel}</span>
        <span>{total}</span>
      </div>
    ) : null}
    <div className="mu-approval-actions" style={{ position: "relative" }}>
      <span className="mu-btn" style={{ opacity: approved ? 0 : 1 }}>{deny}</span>
      <span className="mu-btn primary" data-click={allowId} style={{ opacity: approved ? 0 : 1 }}>
        {allow}
      </span>
      {approved ? (
        <span className="mu-approved">
          <CheckCircleIcon size={26} color="#1FA463" stroke={2.2} />
          Approved
        </span>
      ) : null}
    </div>
  </div>
);

export const MuseDone: React.FC<{ text?: string; size?: number; style?: React.CSSProperties }> = ({ text = "Done!", size = 26, style }) => (
  <div className="mu-done" style={{ fontSize: size, ...style }}>
    <CheckCircleIcon size={size * 1.15} color="#2F7CF6" stroke={2.2} />
    {text}
  </div>
);
