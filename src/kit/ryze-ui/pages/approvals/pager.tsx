import React from "react";
import { PageNav } from "../../page-nav";
import "./approvals.css";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export const ApprovalsPager: React.FC<{
  pages?: string[];
  current?: string;
  style?: React.CSSProperties;
}> = ({ pages = ["1", "2", "3"], current = "1", style }) => (
  <PageNav
    className="appr-pager"
    itemClassName="p-btn"
    pages={pages}
    current={current}
    prev={<ChevronLeftIcon />}
    prevClassName="p-btn dim"
    next={<ChevronRightIcon />}
    style={style}
  />
);
