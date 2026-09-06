import React from "react";
import { ChevronRight } from "../../icons";
import { PageNav } from "../../page-nav";
import "./geo-queries.css";

export const QueriesPager: React.FC<{
  pages?: string[];
  current?: string;
  style?: React.CSSProperties;
}> = ({ pages = ["1", "2", "3"], current = "1", style }) => (
  <PageNav
    className="gq-pager"
    itemClassName="gq-pgbtn"
    activeClassName="active"
    pages={pages}
    current={current}
    prev={<ChevronRight />}
    next={<ChevronRight />}
    style={style}
  />
);
