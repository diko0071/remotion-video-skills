import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./approvals.css";
import { APPROVALS_TABS } from "./data";
import { ChevronDown, KanbanIcon, ListIcon } from "./icons";

const Tab: React.FC<{ label: string; active: boolean }> = ({ label, active }) => {
  const scale = useClickPress(`apr.tab.${label}`);
  return (
    <span
      className={`appr-tab${active ? " active" : ""}`}
      data-click={`apr.tab.${label}`}
      style={{ scale: String(scale) }}
    >
      {label}
    </span>
  );
};

const ViewToggle: React.FC<{
  id: "list" | "board";
  active: boolean;
  children: React.ReactNode;
}> = ({ id, active, children }) => {
  const scale = useClickPress(`apr.view.${id}`);
  return (
    <span data-click={`view.approvals.${id}`} style={{ display: "inline-flex" }}>
      <span
        className={`appr-view${active ? " active" : ""}`}
        data-click={`apr.view.${id}`}
        style={{ scale: String(scale) }}
      >
        {children}
      </span>
    </span>
  );
};

export const ApprovalsToolbar: React.FC<{
  view: "list" | "board";
  tab?: string;
  product?: string;
  style?: React.CSSProperties;
}> = ({ view, tab = "Pending", product = "All products", style }) => {
  const filterScale = useClickPress("apr.filter.product");
  return (
    <div className="appr-toolbar" style={style}>
      {view === "list" ? (
        <div className="appr-tabs">
          {APPROVALS_TABS.map((label) => (
            <Tab key={label} label={label} active={label === tab} />
          ))}
        </div>
      ) : (
        <div />
      )}
      <div className="appr-tools">
        <span
          className="appr-select"
          data-click="apr.filter.product"
          style={{ scale: String(filterScale) }}
        >
          {product}
          <ChevronDown />
        </span>
        <ViewToggle id="list" active={view === "list"}>
          <ListIcon />
        </ViewToggle>
        <ViewToggle id="board" active={view === "board"}>
          <KanbanIcon />
        </ViewToggle>
      </div>
    </div>
  );
};
