import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { SparkIcon } from "../../icons";
import "./report-detail.css";
import { ArrowLeftGlyph, DownloadGlyph, MailGlyph } from "./icons";

export const ReportTop: React.FC<{
  backLabel?: string;
  style?: React.CSSProperties;
}> = ({ backLabel = "Back to reports", style }) => {
  const emailScale = useClickPress("rd.email");
  const pdfScale = useClickPress("rd.pdf");
  const updateScale = useClickPress("rd.update");
  return (
    <div className="rd-top" style={style}>
      <span className="rd-back">
        <ArrowLeftGlyph />
        {backLabel}
      </span>
      <div className="rd-actions">
        <span className="btn-outline" data-click="rd.email" style={{ scale: String(emailScale) }}>
          <MailGlyph />
          Send via Email
        </span>
        <span className="btn-outline" data-click="rd.pdf" style={{ scale: String(pdfScale) }}>
          <DownloadGlyph />
          Download PDF
        </span>
        <span className="btn-primary" data-click="rd.update" style={{ scale: String(updateScale) }}>
          <SparkIcon size={14} />
          Update Report
        </span>
      </div>
    </div>
  );
};
