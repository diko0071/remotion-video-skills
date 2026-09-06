import React from "react";
import { Img, staticFile } from "remotion";
import "../../ryze-ui/pages/chat-artifact/chat-artifact.css";
import type { DeckContent, DeckSlide, DeckSpec } from "../types";

const CX = 640;
const CY = 1128.4;
const R = 1000;
const A_FROM = 230.2;
const A_SPAN = 79.6;

const pointAt = (t: number, radius = R): [number, number] => {
  const a = ((A_FROM + t * A_SPAN) * Math.PI) / 180;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
};

const arc = (from: number, to: number): string => {
  const [x0, y0] = pointAt(from);
  const [x1, y1] = pointAt(to);
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

const BANDS = [
  [0, 0.5, 0.1],
  [0.5, 0.7, 0.15],
  [0.7, 0.9, 0.2],
  [0.9, 1, 0.26],
] as const;

const Gauge: React.FC<{
  score: number;
  outOf: string;
  band: string;
  healthyAt: string;
  healthyLabel: string;
}> = ({ score, outOf, band, healthyAt, healthyLabel }) => {
  const t = Math.max(0, Math.min(1, score / 100));
  const healthyT = Math.max(0, Math.min(1, Number(healthyAt) / 100));
  const [hx0, hy0] = pointAt(healthyT, R - 10);
  const [hx1, hy1] = pointAt(healthyT, R + 50);
  const [px, py] = pointAt(t);
  return (
    <svg
      className="dk-gauge"
      width="1280"
      height="380"
      viewBox="0 0 1280 380"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="butt">
        {BANDS.map(([from, to, opacity]) => (
          <path
            key={from}
            d={arc(from, to)}
            stroke="#f2efe3"
            strokeOpacity={opacity}
            strokeWidth="20"
          />
        ))}
        <path d={arc(0, t)} stroke="#c8e061" strokeWidth="20" />
        <line
          x1={hx0.toFixed(1)}
          y1={hy0.toFixed(1)}
          x2={hx1.toFixed(1)}
          y2={hy1.toFixed(1)}
          stroke="#f2efe3"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
      </g>
      <circle cx={px.toFixed(1)} cy={py.toFixed(1)} r="13" fill="#c8e061" />
      <circle cx={px.toFixed(1)} cy={py.toFixed(1)} r="5" fill="#0d1f18" />
      <g fontFamily="Plus Jakarta Sans, sans-serif">
        <text
          x={(hx1 + 12).toFixed(1)}
          y={(hy1 - 4).toFixed(1)}
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.6"
          fill="rgba(242,239,227,0.62)"
        >
          {healthyLabel}
        </text>
        <text
          x="615"
          y="300"
          textAnchor="middle"
          fontSize="140"
          fontWeight="800"
          letterSpacing="-6"
          fill="#c8e061"
        >
          {score}
        </text>
        <text x="700" y="300" fontSize="34" fontWeight="700" fill="rgba(242,239,227,0.5)">
          {outOf}
        </text>
        <text
          x="640"
          y="338"
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          letterSpacing="1.4"
          fill="rgba(242,239,227,0.62)"
        >
          {band}
        </text>
      </g>
    </svg>
  );
};

const Content: React.FC<{ content: DeckContent }> = ({ content }) => {
  if (content.kind === "gauge")
    return (
      <Gauge
        score={content.score}
        outOf={content.outOf}
        band={content.band}
        healthyAt={content.healthyAt}
        healthyLabel={content.healthyLabel}
      />
    );
  if (content.kind === "bullets")
    return (
      <div className="dk-content">
        <ul style={{ listStyle: "disc outside", marginLeft: 20 }}>
          {content.items.map((item) => (
            <li key={item} style={{ padding: "6px 0" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  return (
    <div className="dk-content">
      <div className="dk-score-col">
        <p className="dk-score-big num">
          {content.score}
          <em>{content.outOf}</em>
        </p>
        <p className="dk-score-band">{content.band}</p>
        <p className="dk-score-note">{content.note}</p>
        <div className="dk-sources">
          {content.sources.map((s) => (
            <span key={s.name} className="dk-source">
              {s.logo ? <Img src={staticFile(s.logo)} /> : null}
              <b>{s.name}</b> {s.detail}
            </span>
          ))}
        </div>
      </div>
      <div className="dk-cats">
        {content.categories.map((c) => (
          <div key={c.name} className="dk-cat">
            <span className="dk-cat-n">
              {c.name} <span>· {c.weight}</span>
            </span>
            <span className="dk-cat-t">
              <i style={{ width: `${c.score}%` }} />
            </span>
            <span className="dk-cat-v num">{c.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Slide: React.FC<{ slide: DeckSlide }> = ({ slide }) => {
  const cover = slide.content.kind === "gauge";
  return (
    <section className={`dk-slide ${slide.tone}${cover ? " cover" : ""}`}>
      {cover ? (
        <>
          <div className="dk-cover-top">
            <h1>{slide.title}</h1>
            {slide.sub ? <p className="dk-sub">{slide.sub}</p> : null}
            <div className="dk-cover-foot">
              <span>{slide.footer}</span>
              <span className="dk-idx num">{slide.index}</span>
            </div>
          </div>
          <Content content={slide.content} />
        </>
      ) : (
        <>
          <span className="dk-marknum num">{slide.index.split(" / ")[0]}</span>
          <div className="dk-head">
            <h2>{slide.title}</h2>
            {slide.sub ? <p className="dk-sub">{slide.sub}</p> : null}
          </div>
          <Content content={slide.content} />
          <div className="dk-folio">
            <span>{slide.footer}</span>
            <span className="dk-idx num">{slide.index}</span>
          </div>
        </>
      )}
    </section>
  );
};

export const DeckArtifact: React.FC<{ deck: DeckSpec }> = ({ deck }) => (
  <div className="ca-frame">
    <div className="ca-deck">
      <div className="ca-deck-body">
        {deck.slides.map((slide) => (
          <Slide key={slide.index} slide={slide} />
        ))}
      </div>
    </div>
  </div>
);
