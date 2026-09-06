import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, useReveal } from "../../core/motion";

const g = (file: string) => staticFile(`graza/${file}`);
const ease = SPRINGS.smooth;
const useRise = (start: number) => useReveal(start, 18, 26);

const TICK_TEXT =
  "Single-farm Picual olives from Jaén, Spain ✳ Free shipping over $50 ✳ Squeeze responsibly ✳ Cook with Sizzle · Finish with Drizzle · Fry with Frizzle ✳ ";

export const Ticker: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 1.7) % 1400;
  return (
    <div className="tick">
      <div className="tick__in" style={{ transform: `translateX(${-shift}px)` }}>
        <span>
          {TICK_TEXT}
          {TICK_TEXT}
          {TICK_TEXT}
        </span>
      </div>
    </div>
  );
};

export const SiteHeader: React.FC = () => (
  <header className="site">
    <div className="site__in">
      <span className="logo">
        GRAZA<span>.</span>
      </span>
      <nav className="nav">
        <a>Shop</a>
        <a aria-current="page">Glog</a>
        <a>Our Story</a>
        <a>FAQ</a>
      </nav>
      <span className="hbtn">Get the Trio</span>
    </div>
  </header>
);

export const Hero: React.FC<{ localStart: number }> = ({ localStart }) => {
  const kick = useRise(localStart + 4);
  const title = useRise(localStart + 10);
  const sub = useRise(localStart + 18);
  const meta = useRise(localStart + 24);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imgP = spring({ frame: frame - (localStart + 6), fps, config: ease, durationInFrames: 34 });
  const stampP = spring({
    frame: frame - (localStart + 30),
    fps,
    config: { damping: 13, mass: 0.8 },
  });
  return (
    <div className="hero">
      <div className="hero__grid">
        <div className="hero__copy">
          <span className="hero__kick" style={kick}>
            Glog · Education · 2026
          </span>
          <h1 style={title}>
            Sizzle, Drizzle, or <em>Frizzle?</em> The right oil for every job
          </h1>
          <p className="hero__sub" style={sub}>
            Three squeeze-able olive oils, three totally different jobs. Here's which one to cook
            with, which one to pour on everything, and which one belongs in the fryer — with smoke
            points actually explained.
          </p>
          <div className="hero__meta" style={meta}>
            <span className="hero__ava">G</span>
            <span>
              <b style={{ color: "var(--cream)" }}>Team Graza</b> · 8 min read · July 2026
            </span>
          </div>
        </div>
        <div className="hero__media">
          <Img
            src={g("party.jpg")}
            style={{
              opacity: imgP,
              transform: `scale(${interpolate(imgP, [0, 1], [1.1, 1])})`,
            }}
          />
          <span
            className="hero__stamp"
            style={{
              opacity: Math.min(1, stampP * 1.4),
              transform: `rotate(-4deg) scale(${interpolate(stampP, [0, 1], [0.6, 1])})`,
            }}
          >
            Oil for every table
          </span>
        </div>
      </div>
    </div>
  );
};

const STRIP = [
  { num: "1", lbl: "Single farm · Jaén, Spain" },
  { num: "100%", lbl: "Picual olives, no blends" },
  { num: "410°F", lbl: "Sizzle's heat ceiling" },
  { num: "3", lbl: "Oils, three jobs" },
];

export const FactStrip: React.FC = () => (
  <div className="strip">
    <div className="strip__in">
      {STRIP.map((s) => (
        <div key={s.lbl} className="strip__item">
          <div className="strip__num">{s.num}</div>
          <div className="strip__lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Toc: React.FC = () => (
  <nav className="toc">
    <div className="toc__in">
      <span className="toc__label">On this page</span>
      {[
        ["01", "Why single-farm hits different"],
        ["02", "The lineup, ranked by job"],
        ["03", "Job-by-job cheat sheet"],
        ["04", "Smoke points, explained"],
        ["05", "Which bottle are you?"],
        ["06", "FAQ"],
      ].map(([n, label]) => (
        <a key={n} className={n === "01" ? "on" : undefined}>
          <i>{n}</i>
          {label}
        </a>
      ))}
      <div className="toc__cta">
        <b>Can't decide?</b>
        The Trio covers all three jobs — Sizzle, Drizzle and Frizzle in one box.
        <a>Grab it → $52</a>
      </div>
    </div>
  </nav>
);

export const SiteFooter: React.FC = () => (
  <footer className="site-footer">
    <div className="ft__top">
      <div>
        <div className="ft__logo">
          GRAZA<span>.</span>
        </div>
        <p className="ft__blurb">
          Single-farm Picual olive oil from Jaén, Spain — squeezed, not glugged. Cook with Sizzle,
          finish with Drizzle, fry with Frizzle.
        </p>
        <div className="ft__social">
          {["IG", "TT", "X", "FB", "YT"].map((s) => (
            <a key={s} style={{ fontSize: 11, fontWeight: 700 }}>
              {s}
            </a>
          ))}
        </div>
      </div>
      <nav>
        <h4 className="ft__h">Shop</h4>
        <ul className="ft__links">
          <li><a>Drizzle</a></li>
          <li><a>Sizzle</a></li>
          <li><a>Frizzle</a></li>
          <li><a>All Products</a></li>
        </ul>
      </nav>
      <nav>
        <h4 className="ft__h">Learn</h4>
        <ul className="ft__links">
          <li><a>The Glog</a></li>
          <li><a>Our Story</a></li>
          <li><a>FAQ</a></li>
          <li><a>Wholesale</a></li>
        </ul>
      </nav>
      <div className="ft__news">
        <h4 className="ft__h">Join the Glog list</h4>
        <p>Recipes, drops and olive-oil education. No spam, just squeeze.</p>
        <div className="ft__form">
          <input placeholder="Your email" readOnly />
          <button type="button">Join</button>
        </div>
        <p className="ft__fine">
          By subscribing you agree to the <a>Terms</a> & <a>Privacy Policy</a>.
        </p>
      </div>
    </div>
    <div className="ft__bottom">
      <div className="ft__bottom-in">
        <span className="ft__copy">© 2026 Graza. All rights reserved.</span>
        <span className="ft__legal">
          <a>Terms</a>
          <a>Privacy</a>
          <a>Returns</a>
        </span>
        <span className="ft__pay">
          {["VISA", "MC", "AMEX", "PayPal", "Shop Pay"].map((p) => (
            <span key={p}>{p}</span>
          ))}
        </span>
      </div>
    </div>
  </footer>
);
