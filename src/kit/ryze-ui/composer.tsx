import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { ArrowUpIcon, MicIcon, PlusIcon } from "./icons";

const ComposerImages: React.FC<{
  images: { src: string; name?: string }[];
  from: number;
}> = ({ images, from }) => {
  const frame = useCurrentFrame();
  return (
    <div className="composer-images">
      {images.map((img, i) => (
        <span
          key={img.src}
          className="composer-image"
          style={{ opacity: frame >= from + i * 5 ? 1 : 0 }}
        >
          <Img src={staticFile(img.src)} />
        </span>
      ))}
    </div>
  );
};

export const Composer: React.FC<{
  typed?: string;
  cursor?: boolean;
  attachment?: React.ReactNode;
  images?: { src: string; name?: string }[];
  imagesFrom?: number;
  sendScale?: number;
  disclaimer?: boolean;
  placeholder?: string;
  approval?: string;
  flatRing?: boolean;
  revealAt?: number;
  expandAt?: number;
  plusTurn?: number;
  plusScale?: number;
  menu?: React.ReactNode;
  heading?: React.ReactNode;
  fill?: boolean;
}> = ({
  typed = "",
  cursor = false,
  attachment,
  images,
  imagesFrom,
  sendScale = 1,
  disclaimer = false,
  placeholder = "Message Agent…",
  approval,
  flatRing = false,
  revealAt,
  expandAt,
  plusTurn = 0,
  plusScale = 1,
  menu,
  heading,
  fill = false,
}) => {
  const grow = useSpringAt(revealAt ?? -1e6, SPRINGS.card, 26);
  const expand = useSpringAt(expandAt ?? revealAt ?? -1e6, SPRINGS.card, 30);
  const inputIn = useSpringAt(revealAt !== undefined ? revealAt + 12 : -1e6, SPRINGS.smooth, 18);
  const barIn = useSpringAt(revealAt !== undefined ? revealAt + 18 : -1e6, SPRINGS.smooth, 18);
  const settled = grow > 0.999 && expand > 0.999;
  const cardWidth = `${interpolate(grow, [0, 1], [46, 62]) + interpolate(expand, [0, 1], [0, 38])}%`;
  return (
    <div className="composer-wrap">
      {heading ? (
        <div style={{ width: cardWidth, margin: "0 auto" }}>{heading}</div>
      ) : null}
      <section
        className="composer"
        data-click="composer"
        style={{
          width: fill
            ? "100%"
            : `${interpolate(grow, [0, 1], [46, 62]) + interpolate(expand, [0, 1], [0, 38])}%`,
          margin: "0 auto",
          maxHeight: settled
            ? undefined
            : interpolate(grow, [0, 1], [58, 232]) + interpolate(expand, [0, 1], [0, 148]),
          overflow: settled ? undefined : "hidden",
          ...(flatRing
            ? {
                boxShadow:
                  "0 0 0 1px rgba(15,23,42,0.14), 0 12px 36px rgba(74,53,29,0.10)",
              }
            : undefined),
        }}
      >
        {attachment}
        {images?.length ? (
          <ComposerImages images={images} from={imagesFrom ?? -1e6} />
        ) : null}
        <div className="composer-input" style={{ opacity: inputIn }}>
          {typed.length === 0 ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            <span>
              {typed}
              <span
                data-click="composer.caret"
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  background: "var(--foreground)",
                  verticalAlign: "-0.12em",
                  marginLeft: 1,
                  opacity: cursor ? 1 : 0,
                }}
              />
            </span>
          )}
        </div>
        <div className="composer-bar" style={{ opacity: barIn }}>
          <div className="composer-left">
            <div
              className="icon-btn"
              data-click="composer.plus"
              style={{ transform: `rotate(${plusTurn}deg) scale(${plusScale})` }}
            >
              <PlusIcon />
            </div>
            {approval ? (
              <div className="composer-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                {approval}
                <svg
                  className="composer-pill-caret"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            ) : null}
          </div>
          <div className="composer-right">
            <div className="icon-btn">
              <MicIcon />
            </div>
            <div
              className="send-btn"
              data-click="composer.send"
              style={{
                transform: `scale(${sendScale})`,
                background: typed.length > 0 ? "var(--foreground)" : undefined,
                opacity: typed.length > 0 || attachment ? 1 : 0.5,
              }}
            >
              <ArrowUpIcon />
            </div>
          </div>
        </div>
      </section>
      {menu ? (
        <div
          style={{
            position: "relative",
            width: `${interpolate(grow, [0, 1], [46, 62]) + interpolate(expand, [0, 1], [0, 38])}%`,
            margin: "0 auto",
            height: 0,
          }}
        >
          {menu}
        </div>
      ) : null}
      {disclaimer ? (
        <a className="disclaimer">Make sure you review output. The agent can make mistakes.</a>
      ) : null}
    </div>
  );
};
