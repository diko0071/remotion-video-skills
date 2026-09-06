import React from "react";
import { Img, staticFile } from "remotion";
import { RyzeApp } from "../../app-shell";
import { SparkIcon } from "../../icons";
import "./brand.css";
import { BRAND_HOST, BRAND_NAME, BRAND_SUMMARY, BRAND_TABS } from "./data";
import { PencilGlyph } from "./icons";
import { useClickPress } from "../../../../core/press-context";

const ImproveBrandButton: React.FC = () => {
  const scale = useClickPress("brand.improve");
  return (
    <span
      className="btn-primary"
      data-click="brand.improve"
      style={{ scale: String(scale) }}
    >
      <SparkIcon />
      Improve Brand Profile
    </span>
  );
};

export const BrandShellBody: React.FC<{
  tab: string;
  children: React.ReactNode;
  tabs?: string[];
  name?: string;
  host?: string;
  summary?: string;
}> = ({
  tab,
  children,
  tabs = BRAND_TABS,
  name = BRAND_NAME,
  host = BRAND_HOST,
  summary = BRAND_SUMMARY,
}) => (
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <div className="pg-head">
            <div>
              <h1 className="pg-h1">Brand</h1>
              <p className="pg-sub">
                The brand context your SEO, Paid Ads and content agents read on
                every turn.
              </p>
            </div>
            <div className="pg-actions">
              <ImproveBrandButton />
            </div>
          </div>

          <div className="pg-card br-head-card">
            <span className="br-favicon">
              <Img src={staticFile("product-1.jpg")} alt="" />
            </span>
            <div className="br-head-txt">
              <h2>{name}</h2>
              <div className="br-host">{host}</div>
              <p>{summary}</p>
            </div>
            <span className="br-pencil">
              <PencilGlyph />
            </span>
          </div>

          <div className="br-tabs">
            {tabs.map((t) => (
              <span
                key={t}
                data-click={`tab.brand.${t}`}
                className={t === tab ? "br-tab active" : "br-tab"}
              >
                {t}
              </span>
            ))}
          </div>

          {children}
        </div>
      </div>
    </div>
);

export const BrandShell: React.FC<React.ComponentProps<typeof BrandShellBody>> = (props) => (
  <RyzeApp workspace="ember-and-oak" page="Brand" nav="Brand" stretch>
    <BrandShellBody {...props} />
  </RyzeApp>
);
