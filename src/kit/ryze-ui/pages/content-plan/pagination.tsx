import React from "react";
import { PageNav } from "../../page-nav";
import "./content-plan.css";

export const ContentPlanPagination: React.FC<{
  pages?: string[];
  current?: string;
  style?: React.CSSProperties;
}> = ({ pages = ["1", "2", "3"], current = "1", style }) => (
  <PageNav
    className="cp-pagination"
    itemClassName="pgn"
    pages={pages}
    current={current}
    prev="‹"
    prevClassName="pgn ghost"
    next="›"
    nextClassName="pgn ghost"
    style={style}
  />
);
