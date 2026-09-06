import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import { PlugIcon } from "../../icons";
import "./integrations.css";
import { IntegrationItem } from "./types";

export const IntegrationCard: React.FC<{
  item: IntegrationItem;
  style?: React.CSSProperties;
}> = ({ item, style }) => {
  const scale = useClickPress(`intg.${item.name}`);
  return (
    <div
      className="intg-card"
      data-click={`intg.${item.name}`}
      style={{ ...style, scale: String(scale) }}
    >
      <div className="intg-top">
        <span
          className="intg-tile"
          style={item.iconBg ? { background: item.iconBg } : undefined}
        >
          <Img src={staticFile(item.icon)} />
        </span>
        <div className="intg-body">
          <div className="intg-title-row">
            <span className="intg-name">{item.name}</span>
            {item.state === "connected" ? (
              <span className="spill ok">
                <span className="dot" />
                Connected
              </span>
            ) : null}
            {item.state === "accounts" ? (
              <span className="spill ok">
                <span className="dot" />
                {item.accountsCount} accounts
              </span>
            ) : null}
            {item.state === "reconnect" ? (
              <span className="spill warn">
                <span className="dot" />
                Reconnect needed
              </span>
            ) : null}
            {item.state === "setup" ? (
              <span className="spill warn">
                <span className="dot" />
                Require setup
              </span>
            ) : null}
          </div>
          <p className="intg-desc">{item.description}</p>
        </div>
      </div>
      <div className="intg-actions">
        {item.state === "none" ? (
          <span className="btn-primary">
            <PlugIcon />
            Connect
          </span>
        ) : item.state === "reconnect" ? (
          <span className="btn-primary">
            <PlugIcon />
            Reconnect
          </span>
        ) : item.state === "setup" ? (
          <span className="btn-primary">View</span>
        ) : (
          <span className="btn-outline">View</span>
        )}
      </div>
    </div>
  );
};
