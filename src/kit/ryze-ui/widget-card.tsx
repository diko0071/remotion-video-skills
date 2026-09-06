import React from "react";
import { DownloadIcon } from "./icons";

export const WidgetCard: React.FC<{
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  body?: boolean;
  children: React.ReactNode;
}> = ({ title, subtitle, headerAction, footer, body = true, children }) => (
  <div className="widget-card" data-click="widget.card">
    {title ? (
      <div className="card-header">
        <div>
          <div className="card-title">{title}</div>
          {subtitle ? <div className="card-subtitle">{subtitle}</div> : null}
        </div>
        {headerAction}
      </div>
    ) : null}
    {body ? <div className="card-body">{children}</div> : children}
    {footer ? <div className="card-footer">{footer}</div> : null}
  </div>
);

export const DownloadAction: React.FC = () => (
  <div className="card-icon-btn">
    <DownloadIcon />
  </div>
);
