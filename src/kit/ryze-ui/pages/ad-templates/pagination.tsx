import React from "react";
import { PageNav } from "../../page-nav";
import "./ad-templates.css";
import { AD_TEMPLATE_PAGES } from "./data";
import { ChevronLeft, ChevronRight } from "./icons";

export const AdTemplatesPagination: React.FC<{
  pages?: string[];
  current?: string;
  style?: React.CSSProperties;
}> = ({ pages = AD_TEMPLATE_PAGES, current = "1", style }) => (
  <PageNav
    className="adt-pagination"
    itemClassName="adt-page"
    pages={pages}
    current={current}
    modifier={(p) => (p === "…" ? "dots" : undefined)}
    prev={<ChevronLeft />}
    prevClassName="adt-page ghost dim"
    next={<ChevronRight />}
    nextClassName="adt-page ghost"
    style={style}
  />
);
