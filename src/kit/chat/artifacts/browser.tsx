import React from "react";
import { Img, staticFile } from "remotion";
import "../../ryze-ui/pages/chat-artifact/chat-artifact.css";
import type { SiteSpec } from "../types";

export const BrowserArtifact: React.FC<{ site: SiteSpec }> = ({ site }) => (
  <div className="ca-site">
    <div className="st-announce">{site.announce}</div>
    <header className="st-header">
      <span className="st-mark">{site.brand}</span>
      <nav className="st-nav">
        {site.nav.map((n) => (
          <span key={n.label} className={n.active ? "active" : undefined}>
            {n.label}
          </span>
        ))}
      </nav>
      <span className="st-actions">
        {site.actions.map((a) => (
          <span key={a}>{a}</span>
        ))}
        {site.cart ? <span className="st-cart">{site.cart}</span> : null}
      </span>
    </header>
    <div className="st-hero">
      <Img src={staticFile(site.hero.img)} className="st-hero-img" />
      <div className="st-hero-text">
        <span className="st-crumb">{site.hero.crumb}</span>
        <h1>{site.hero.title}</h1>
        <p>{site.hero.text}</p>
      </div>
    </div>
    {site.toolbar ? (
      <div className="st-toolbar">
        <span className="st-count">{site.toolbar.count}</span>
        <span className="st-filters">
          {site.toolbar.filters.map((f) => (
            <span key={f} className="st-filter">
              {f}
            </span>
          ))}
          <span className="st-sort">{site.toolbar.sort}</span>
        </span>
      </div>
    ) : null}
    <div className="st-grid">
      {site.products.map((p) => (
        <div key={p.name} className="st-product">
          <Img src={staticFile(p.img)} className="st-product-img" />
          <span className="st-product-name">{p.name}</span>
          <span className="st-product-note">{p.note}</span>
          <span className="st-product-price">{p.price}</span>
        </div>
      ))}
    </div>
  </div>
);
