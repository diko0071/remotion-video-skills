import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import { CloseIcon } from "../../icons";
import "./templates.css";

export const TemplatePreviewDialog: React.FC<{
  at: number;
  visible?: boolean;
  image?: string;
  slides?: string[];
  scrollAt?: number;
  scrollBy?: number;
  title: string;
  description: string;
  hint?: string;
  header?: React.ReactNode;
  actions: React.ReactNode;
}> = ({
  at,
  visible = true,
  image,
  slides,
  scrollAt,
  scrollBy = 0,
  title,
  description,
  hint,
  header,
  actions,
}) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const closeScale = useClickPress("dlg.close");
  const scroll = useSpringAt(scrollAt ?? -1e6, SPRINGS.smooth, 60);
  const shift = interpolate(scroll, [0, 1], [0, -scrollBy]);
  return (
    <div className="tpl-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="tpl-dialog"
        style={{
          transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`,
        }}
      >
        <span
          className="tpl-dialog-close"
          data-click="dlg.close"
          style={{ scale: String(closeScale) }}
        >
          <CloseIcon />
        </span>
        <div className="tpl-dialog-preview">
          <div style={{ transform: `translateY(${shift}px)` }}>
            {slides ? (
              slides.map((slide) => (
                <Img key={slide} src={staticFile(slide)} alt="" />
              ))
            ) : image ? (
              <Img src={staticFile(image)} alt="" />
            ) : null}
          </div>
        </div>
        <div className="tpl-dialog-foot">
          <div className="tpl-dialog-info">
            {header}
            <div className="tpl-dialog-title">{title}</div>
            <p className="tpl-dialog-desc">{description}</p>
            {hint ? <p className="tpl-dialog-hint">{hint}</p> : null}
          </div>
          <div className="tpl-dialog-actions">{actions}</div>
        </div>
      </div>
    </div>
  );
};
