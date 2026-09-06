import React from "react";
import "./brand.css";
import { BrandCard } from "./brand-card";
import { BrandShell, BrandShellBody } from "./brand-shell";
import { BRAND_INDUSTRY, BRAND_OFFER, BRAND_VOICE } from "./data";
import { BrandField } from "./field";

export const BrandIdentityBody: React.FC<{ voice?: string }> = ({ voice }) => (
  <BrandShellBody tab="Identity">
    <div className="br-grid">
      <BrandCard title="What you sell">
        <div className="br-fields">
          <BrandField label="Offer" value={BRAND_OFFER} />
          <BrandField label="Industry" value={BRAND_INDUSTRY} />
        </div>
      </BrandCard>

      <BrandCard title="Tone of voice">
        <p className="br-prose relaxed">{voice ?? BRAND_VOICE}</p>
      </BrandCard>
    </div>
  </BrandShellBody>
);

export const BrandIdentityPage: React.FC = () => (
  <BrandShell tab="Identity">
    <div className="br-grid">
      <BrandCard title="What you sell">
        <div className="br-fields">
          <BrandField label="Offer" value={BRAND_OFFER} />
          <BrandField label="Industry" value={BRAND_INDUSTRY} />
        </div>
      </BrandCard>

      <BrandCard title="Tone of voice">
        <p className="br-prose relaxed">{BRAND_VOICE}</p>
      </BrandCard>
    </div>
  </BrandShell>
);
