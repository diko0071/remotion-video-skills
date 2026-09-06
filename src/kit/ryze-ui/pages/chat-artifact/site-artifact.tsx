import React from "react";
import { Img, staticFile } from "remotion";
import "../../pages.css";
import "./chat-artifact.css";
import { NAV, PRODUCTS } from "./data";
import { Product } from "./types";

export const SiteArtifact: React.FC<{
  nav?: string[];
  products?: Product[];
  style?: React.CSSProperties;
}> = ({ nav = NAV, products = PRODUCTS, style }) => (
  <div className="ca-site" style={style}>
    <div className="st-announce">
      Free shipping on orders over $60 · Hand poured in Portland
    </div>
    <header className="st-header">
      <span className="st-mark">EMBER &amp; OAK</span>
      <nav className="st-nav">
        {nav.map((n) => (
          <span key={n} className={n === "Candles" ? "active" : undefined}>
            {n}
          </span>
        ))}
      </nav>
      <span className="st-actions">
        <span>Search</span>
        <span>Account</span>
        <span className="st-cart">Cart (2)</span>
      </span>
    </header>
    <div className="st-hero">
      <Img src={staticFile("hero-candles.jpg")} className="st-hero-img" />
      <div className="st-hero-text">
        <span className="st-crumb">Home / Collections / Soy Candles</span>
        <h1>Soy Candles</h1>
        <p>
          Slow-burning soy wax, cotton and wooden wicks, poured in small batches
          in our Portland studio. Every candle burns clean for at least 48
          hours.
        </p>
      </div>
    </div>
    <div className="st-toolbar">
      <span className="st-count">24 products</span>
      <span className="st-filters">
        <span className="st-filter">Scent family</span>
        <span className="st-filter">Burn time</span>
        <span className="st-filter">Price</span>
        <span className="st-sort">Sort: Best selling</span>
      </span>
    </div>
    <div className="st-grid">
      {products.map((p) => (
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
