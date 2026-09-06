import React from "react";
import { Img, staticFile } from "remotion";
import "../../pages.css";
import "./chat-artifact.css";
import { SCORE_CATS } from "./data";
import { ScoreCat } from "./types";

export const DeckArtifact: React.FC<{
  cats?: ScoreCat[];
  extraNextStep?: ScoreCat;
  coverTitle?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ cats = SCORE_CATS, extraNextStep, coverTitle, style }) => (
  <div className="ca-frame" style={style}>
    <div className="ca-deck">
      <div className="ca-deck-body">
        <section className="dk-slide dark cover" data-click="dk.slide.01">
          <div className="dk-cover-top">
            <h1>{coverTitle ?? <>$182,000 a year is ranking, not selling.</>}</h1>
            <p className="dk-sub">
              Ember &amp; Oak · SEO audit · 1–28 July 2026 · 940 URLs and 12,400
              queries reviewed against Search Console, GA4, Shopify and
              DataForSEO.
            </p>
            <div className="dk-cover-foot">
              <span>Ember &amp; Oak × Ryze</span>
              <span className="dk-idx num">01 / 10</span>
            </div>
          </div>
          <svg
            className="dk-gauge"
            width="1280"
            height="380"
            viewBox="0 0 1280 380"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" strokeLinecap="butt">
              <path
                d="M 0 360 A 1000 1000 0 0 1 640 128.4"
                stroke="#f2efe3"
                strokeOpacity="0.10"
                strokeWidth="20"
              />
              <path
                d="M 640 128.4 A 1000 1000 0 0 1 913.9 166.6"
                stroke="#f2efe3"
                strokeOpacity="0.15"
                strokeWidth="20"
              />
              <path
                d="M 913.9 166.6 A 1000 1000 0 0 1 1165.4 277.6"
                stroke="#f2efe3"
                strokeOpacity="0.2"
                strokeWidth="20"
              />
              <path
                d="M 1165.4 277.6 A 1000 1000 0 0 1 1280 360"
                stroke="#f2efe3"
                strokeOpacity="0.26"
                strokeWidth="20"
              />
              <path
                d="M 0 360 A 1000 1000 0 0 1 726.4 137.8"
                stroke="#c8e061"
                strokeWidth="20"
              />
              <line
                x1="911.2"
                y1="176.2"
                x2="927.6"
                y2="118.5"
                stroke="#f2efe3"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
            </g>
            <circle cx="726.4" cy="137.8" r="13" fill="#c8e061" />
            <circle cx="726.4" cy="137.8" r="5" fill="#0d1f18" />
            <g fontFamily="Plus Jakarta Sans, sans-serif">
              <text
                x="936"
                y="116"
                fontSize="13"
                fontWeight="700"
                letterSpacing="1.6"
                fill="rgba(242,239,227,0.62)"
              >
                70 IS HEALTHY
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
                56
              </text>
              <text
                x="700"
                y="300"
                fontSize="34"
                fontWeight="700"
                fill="rgba(242,239,227,0.5)"
              >
                /100
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
                SEO HEALTH SCORE · NEEDS ATTENTION
              </text>
            </g>
          </svg>
        </section>

        <section className="dk-slide light" data-click="dk.slide.02">
          <span className="dk-marknum num">02</span>
          <div className="dk-head">
            <h2>56 of 100: indexing is healthy, capture is not</h2>
            <p className="dk-sub">
              Six weighted categories. Query opportunity capture scores 38 and
              carries the heaviest weight in the model.
            </p>
          </div>
          <div className="dk-content">
            <div className="dk-score-col">
              <p className="dk-score-big num">
                56<em>/100</em>
              </p>
              <p className="dk-score-band">Needs attention · 50–69 band</p>
              <p className="dk-score-note">
                412,600 impressions returned 9,880 clicks at a 2.4% blended CTR
                and an 18.2 average position.
              </p>
              <div className="dk-sources">
                <span className="dk-source">
                  <Img
                    src={staticFile("integrations/google-search-console.svg")}
                  />
                  <b>Search Console</b> 12,400 queries, 940 URLs
                </span>
                <span className="dk-source">
                  <Img src={staticFile("integrations/google-analytics.svg")} />
                  <b>GA4</b> 6,200 organic sessions, 141 orders
                </span>
                <span className="dk-source">
                  <Img src={staticFile("integrations/shopify-color.svg")} />
                  <b>Shopify</b> $11,900 organic revenue, 28 days
                </span>
                <span className="dk-source">
                  <b>DataForSEO</b> 268 referring domains, 3 competitors
                </span>
              </div>
            </div>
            <div className="dk-cats">
              {cats.map((c) => (
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
          <div className="dk-folio">
            <span>Ember &amp; Oak × Ryze</span>
            <span className="dk-idx num">02 / 10</span>
          </div>
        </section>

        <section className="dk-slide light" data-click="dk.slide.03">
          <span className="dk-marknum num">03</span>
          <div className="dk-head">
            <h2>Where the money leaks: 3 pages, $4,300 a month</h2>
            <p className="dk-sub">
              Ranked by recoverable revenue. Each line: the page, the leak, and
              what closes it.
            </p>
          </div>
          <div className="dk-content">
            <div className="dk-cats">
              {[
                { name: "/collections/soy-candles — title tag cuts off at 38 chars", weight: "$1,900/mo", score: 78 },
                { name: "/products/ember-no-4 — no reviews markup, rich result lost", weight: "$1,400/mo", score: 56 },
                { name: "/blogs/care-guide — ranks #11, one internal link away", weight: "$1,000/mo", score: 41 },
              ].map((c) => (
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
          <div className="dk-folio">
            <span>Ember &amp; Oak × Ryze</span>
            <span className="dk-idx num">03 / 10</span>
          </div>
        </section>

        <section className="dk-slide light" data-click="dk.slide.04">
          <span className="dk-marknum num">04</span>
          <div className="dk-head">
            <h2>What happens next — fixes queued for this week</h2>
            <p className="dk-sub">
              Three fixes ship through Approvals. Two need nothing from you;
              one asks for a click.
            </p>
          </div>
          <div className="dk-content">
            <div className="dk-cats">
              {[
                { name: "Rewrite 12 title tags on collection pages", weight: "auto", score: 92 },
                { name: "Add product review markup to 24 templates", weight: "auto", score: 84 },
                { name: "Approve internal-link pass on the care guide", weight: "1 click", score: 66 },
                ...(extraNextStep ? [extraNextStep] : []),
              ].map((c) => (
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
          <div className="dk-folio">
            <span>Ember &amp; Oak × Ryze</span>
            <span className="dk-idx num">04 / 10</span>
          </div>
        </section>
      </div>
    </div>
  </div>
);
