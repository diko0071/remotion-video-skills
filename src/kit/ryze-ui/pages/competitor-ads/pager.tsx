import React from "react";
import { PageNav } from "../../page-nav";
import "./competitor-ads.css";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export const CompetitorAdsPager: React.FC<{
  pages?: string[];
  current?: string;
  style?: React.CSSProperties;
}> = ({ pages = ["1", "2", "3"], current = "1", style }) => (
  <PageNav
    className="cmp-pager"
    itemClassName="cmp-page"
    pages={pages}
    current={current}
    prev={<ChevronLeftIcon />}
    prevClassName="cmp-page dim"
    next={<ChevronRightIcon />}
    style={style}
  />
);
