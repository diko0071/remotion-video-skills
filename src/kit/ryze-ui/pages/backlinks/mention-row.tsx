import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./backlinks.css";
import { ExternalLinkIcon } from "./icons";
import {
  BACKLINK_STATUS_LABEL,
  BACKLINK_STATUS_TONE,
  BacklinkRow,
} from "./types";

export const MentionRow: React.FC<{ row: BacklinkRow; linksId?: string }> = ({
  row,
  linksId,
}) => {
  const linksScale = useClickPress(linksId);
  return (
  <tr>
    <td>
      <div className="mn-text">{row.text}</div>
    </td>
    <td>
      {row.url === "" ? (
        <span className="mn-empty">—</span>
      ) : row.extra ? (
        <span
          className="mn-links"
          data-click={linksId}
          style={{ scale: String(linksScale) }}
        >
          <ExternalLinkIcon />
          {row.extra + 1} links
        </span>
      ) : (
        <span className="mn-url">{row.url}</span>
      )}
    </td>
    <td className="mn-date">
      {row.published === "" ? (
        <span className="mn-empty">—</span>
      ) : (
        row.published
      )}
    </td>
    <td>
      <span className="mn-pill">
        <span className={`dot ${BACKLINK_STATUS_TONE[row.status]}`} />
        {BACKLINK_STATUS_LABEL[row.status]}
      </span>
    </td>
  </tr>
  );
};
