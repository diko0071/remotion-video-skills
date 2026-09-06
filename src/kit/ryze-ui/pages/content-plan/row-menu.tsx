import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./content-plan.css";
import { CONTENT_PLAN_ACTIONS } from "./data";

const MenuItem: React.FC<{
  label: string;
  clickId: string;
  hovered?: boolean;
  danger?: boolean;
}> = ({ label, clickId, hovered, danger }) => {
  const scale = useClickPress(clickId);
  return (
    <span
      className={`cp-menu-item${hovered ? " hover" : ""}${danger ? " danger" : ""}`}
      data-click={clickId}
      style={{ scale: String(scale) }}
    >
      {label}
    </span>
  );
};

export const ArticleRowMenu: React.FC<{
  at: number;
  hovered?: string;
  visible?: boolean;
  status?: "Planned" | "Drafted" | "Published";
}> = ({ at, hovered, visible = true, status = "Published" }) => {
  const p = useSpringAt(at, SPRINGS.smooth, 14);
  const item = (label: string, clickId: string, danger?: boolean) => (
    <MenuItem
      key={label}
      label={label}
      clickId={clickId}
      hovered={hovered === label}
      danger={danger}
    />
  );
  return (
    <div
      className="cp-rowmenu-pop"
      style={{
        opacity: visible ? p : 0,
        transform: `translateY(${interpolate(p, [0, 1], [-6, 0])}px) scale(${interpolate(p, [0, 1], [0.96, 1])})`,
      }}
    >
      {status === "Planned"
        ? item(CONTENT_PLAN_ACTIONS.generate, "article.menu.generate")
        : null}
      {status !== "Published"
        ? item(CONTENT_PLAN_ACTIONS.edit, "article.menu.edit")
        : null}
      {status !== "Published"
        ? item(CONTENT_PLAN_ACTIONS.reschedule, "article.menu.reschedule")
        : null}
      {status === "Published"
        ? item(CONTENT_PLAN_ACTIONS.republish, "article.menu.republish")
        : null}
      {status === "Published"
        ? item(CONTENT_PLAN_ACTIONS.unpublish, "article.menu.unpublish")
        : null}
      {item(CONTENT_PLAN_ACTIONS.delete, "article.menu.delete", true)}
    </div>
  );
};
