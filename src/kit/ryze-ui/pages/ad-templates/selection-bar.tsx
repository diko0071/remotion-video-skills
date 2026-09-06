import React from "react";
import { CloseIcon, SparkIcon } from "../../icons";
import "./ad-templates.css";
import { AD_TEMPLATE_SELECTED_COUNT } from "./data";

export const AdTemplatesSelectionBar: React.FC<{
  count?: number;
  action?: string;
  style?: React.CSSProperties;
}> = ({
  count = AD_TEMPLATE_SELECTED_COUNT,
  action = "Use as reference",
  style,
}) => (
  <div className="adt-selbar-wrap" style={style}>
    <div className="adt-selbar">
      <span className="x">
        <CloseIcon />
      </span>
      <span className="count">{count} selected</span>
      <span className="use" data-click="adt.use">
        <SparkIcon />
        {action}
      </span>
    </div>
  </div>
);
