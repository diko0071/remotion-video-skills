import React from "react";
import "./brand.css";
import { BrandCard } from "./brand-card";
import { BrandShell, BrandShellBody } from "./brand-shell";
import { BrandCreativeGrid } from "./creative-grid";
import { BRAND_AD_CREATIVES, BRAND_AGENT_NOTES } from "./data";

export const BrandContextBody: React.FC<{
  notes?: string | null;
  notesEditId?: string;
}> = ({ notes = BRAND_AGENT_NOTES, notesEditId }) => (
  <BrandShellBody tab="Context">
    <div className="br-stack">
      <BrandCard title="What the agent should always remember" editId={notesEditId}>
        {notes ? (
          <p className="br-prose">{notes}</p>
        ) : (
          <p className="br-prose empty">
            Nothing yet — tell the agent what to keep in mind about working with
            you.
          </p>
        )}
      </BrandCard>

      <BrandCard title="Writing style preferences">
        <p className="br-prose">
          Short punchy sentences. No corporate jargon. Open with a concrete
          number when you have one. British spelling.
        </p>
      </BrandCard>

      <BrandCard title="Ad creative examples">
        <BrandCreativeGrid sources={BRAND_AD_CREATIVES} />
      </BrandCard>
    </div>
  </BrandShellBody>
);

export const BrandContextPage: React.FC = () => (
  <BrandShell tab="Context">
    <div className="br-stack">
      <BrandCard title="What the agent should always remember">
        <p className="br-prose">{BRAND_AGENT_NOTES}</p>
      </BrandCard>

      <BrandCard title="Ad creative examples">
        <BrandCreativeGrid sources={BRAND_AD_CREATIVES} />
      </BrandCard>
    </div>
  </BrandShell>
);
