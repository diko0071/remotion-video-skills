import React from "react";
import { PageNav } from "../../page-nav";
import "./creatives.css";
import { CREATIVES_PAGES } from "./data";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export const CreativesPager: React.FC<{
  pages?: string[];
  current?: string;
  style?: React.CSSProperties;
}> = ({ pages = CREATIVES_PAGES, current = "1", style }) => (
  <PageNav
    className="crv-pager"
    itemClassName="crv-page"
    pages={pages}
    current={current}
    prev={<ChevronLeftIcon />}
    prevClassName="crv-page dim"
    next={<ChevronRightIcon />}
    style={style}
  />
);
