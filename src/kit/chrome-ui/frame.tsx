import "./chrome.css";
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Pop } from "../pop";

export const CHROME = { strip: 44, bar: 52, top: 97 } as const;
export const EXT_ICON = { x: 1818, y: 70, size: 32 } as const;
export const RYZE_ICON = "chrome-ext/icons/icon128.png";

const Icon: React.FC<{ d: string; size?: number }> = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export type ChromeTab = { title: string; favicon: string };

export const ChromeFrame: React.FC<{
  host: string;
  path?: string;
  tab: ChromeTab;
  badge?: { text: string; color: string; at: number };
  extClickId?: string;
  children: React.ReactNode;
  pageStyle?: React.CSSProperties;
}> = ({ host, path = "", tab, badge, extClickId, children, pageStyle }) => {
  const frame = useCurrentFrame();
  return (
    <div className="chrome">
      <div className="strip">
        <div className="lights">
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
        </div>
        <div className="tab">
          <Img src={staticFile(tab.favicon)} />
          <span>{tab.title}</span>
          <span className="x"><Icon d="M18 6 6 18M6 6l12 12" size={16} /></span>
        </div>
        <div className="newtab"><Icon d="M12 5v14M5 12h14" size={18} /></div>
      </div>
      <div className="bar">
        <span className="nav"><Icon d="m15 18-6-6 6-6" /></span>
        <span className="nav dim"><Icon d="m9 18 6-6-6-6" /></span>
        <span className="nav"><Icon d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></span>
        <div className="omni">
          <Icon d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" size={16} />
          <span><span className="host">{host}</span><span className="path">{path}</span></span>
        </div>
        <div className="right">
          <span className="nav"><Icon d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" size={18} /></span>
          <span className="ext" data-click={extClickId}>
            <Img src={staticFile(RYZE_ICON)} />
            {badge && frame >= badge.at ? (
              <Pop at={badge.at} from={0.4} rise={6} style={{ position: "absolute", right: -2, bottom: -1 }}>
                <span className="badge" style={{ position: "static", background: badge.color }}>{badge.text}</span>
              </Pop>
            ) : null}
          </span>
          <span className="avatar" />
          <span className="nav"><Icon d="M12 5h.01M12 12h.01M12 19h.01" /></span>
        </div>
      </div>
      <div className="page" style={pageStyle}>{children}</div>
    </div>
  );
};
