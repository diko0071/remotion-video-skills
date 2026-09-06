import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { EngineIcon } from "./engine-icon";
import { EngineSpec, PromptRow } from "./types";

export const PromptsCard: React.FC<{
  title?: string;
  hint?: string;
  columns?: [string, string, string, string, string];
  engines: EngineSpec[];
  rows: PromptRow[];
  style?: React.CSSProperties;
}> = ({
  title = "Prompts",
  hint = "Every tracked prompt on every assistant.",
  columns = ["Prompt", "Assistants", "Score", "Cited", "Top brand"],
  engines,
  rows,
  style,
}) => (
  <div className="sd-card sd-stack" style={style}>
    <CardHead title={title} hint={hint} />
    <div className="sd-card-body">
      <table className="sd-table sm">
        <thead>
          <tr>
            <th>{columns[0]}</th>
            <th className="c">{columns[1]}</th>
            <th className="r">{columns[2]}</th>
            <th className="r">{columns[3]}</th>
            <th className="r">{columns[4]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.text}>
              <td>
                <span className="trunc">{row.text}</span>
              </td>
              <td className="c">
                <span className="sd-engines">
                  {row.engines.map((state, i) =>
                    state === null ? null : (
                      <EngineIcon
                        key={engines[i].key}
                        icon={engines[i].icon}
                        dim={!state}
                      />
                    ),
                  )}
                </span>
              </td>
              <td className="num b">
                {row.named}/{row.total}
              </td>
              <td className="num">{row.cited > 0 ? row.cited : "—"}</td>
              <td className="num mut">{row.topBrand ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
