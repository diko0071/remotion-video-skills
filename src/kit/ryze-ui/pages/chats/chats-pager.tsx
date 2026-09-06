import React from "react";
import { ChevronRight } from "../../icons";
import { PageNav } from "../../page-nav";
import "../../pages.css";
import "./chats.css";
import { ChevronLeftIcon } from "./icons";

export const ChatsPager: React.FC<{
  pages?: string[];
  active?: string;
  style?: React.CSSProperties;
}> = ({ pages = ["1", "2", "3"], active = "1", style }) => (
  <PageNav
    className="chats-pager"
    itemClassName="p-btn"
    pages={pages}
    current={active}
    prev={<ChevronLeftIcon />}
    prevClassName="p-btn dim"
    next={<ChevronRight />}
    style={style}
  />
);
