import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { MenuDotsIcon } from "../../icons";
import "./content-plan.css";
import { CONTENT_PLAN_PUBLISH_CTA } from "./data";
import { ArrowTiny } from "./icons";
import { Spark } from "./spark";
import {
  CONTENT_PLAN_STATUS_DOT,
  ContentPlanRow,
  ContentPlanStatus,
  formatCount,
} from "./types";

export const ContentPlanRowCells: React.FC<{
  row: ContentPlanRow;
  status?: ContentPlanStatus;
  publishNow?: boolean | undefined;
  dotsId?: string;
  menu?: React.ReactNode;
}> = ({ row, status, publishNow, dotsId, menu }) => {
  const shown = status ?? row.status;
  const rowScale = useClickPress(`cp.${row.title}`);
  const publishScale = useClickPress("article.publish-now");
  const dotsScale = useClickPress(dotsId);
  return (
    <tr
      data-click={`cp.${row.title}`}
      style={{
        scale: String(rowScale),
        ...(menu ? { position: "relative", zIndex: 40 } : null),
      }}
    >
      <td className="cp-c-title">{row.title}</td>
      <td className="cp-c-url">
        {row.url ? (
          <span className="cp-url">{row.url}</span>
        ) : (
          <span className="cp-empty">—</span>
        )}
      </td>
      <td className="cp-c-date">{row.scheduled}</td>
      <td className="num">
        {row.impressions === null ? (
          <span className="cp-empty">—</span>
        ) : (
          <span className="cp-imp">
            <b>{formatCount(row.impressions)}</b>
            {row.delta !== null ? (
              <span className={`cp-delta ${row.delta >= 0 ? "up" : "down"}`}>
                <ArrowTiny up={row.delta >= 0} />
                {Math.abs(row.delta)}%
              </span>
            ) : null}
          </span>
        )}
      </td>
      <td className="num">
        {row.series ? (
          <Spark series={row.series} up={(row.delta ?? 0) >= 0} />
        ) : (
          <span className="cp-empty">—</span>
        )}
      </td>
      <td>
        <span className="cp-pill">
          <span className={`d ${CONTENT_PLAN_STATUS_DOT[shown]}`} />
          {shown}
        </span>
      </td>
      <td className="num">
        <span className="cp-row-actions">
          {publishNow !== undefined ? (
            <span
              className="cp-publish-now"
              data-click="article.publish-now"
              style={{
                ...(publishNow ? null : { opacity: 0 }),
                scale: String(publishScale),
              }}
            >
              {CONTENT_PLAN_PUBLISH_CTA}
            </span>
          ) : null}
          <span
            className="cp-rowmenu"
            data-click={dotsId}
            style={{ scale: String(dotsScale) }}
          >
            <MenuDotsIcon />
            {menu}
          </span>
        </span>
      </td>
    </tr>
  );
};
