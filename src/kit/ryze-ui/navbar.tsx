import React from "react";
import { Img, staticFile } from "remotion";
import {
  BookIcon,
  ChevronsUpDown,
  CreditsIcon,
  GiftIcon,
  MessageSquarePlusIcon,
  SearchIcon,
  SlashIcon,
  SparkIcon,
} from "./icons";

export const Navbar: React.FC<{ workspace: string; page?: string; credits?: string }> = ({
  workspace,
  page = "Chat",
  credits = "2,450",
}) => (
  <header className="app-navbar">
    <span className="logo">
      <Img src={staticFile("ryze-sun.png")} width={20} height={20} style={{ display: "block" }} />
    </span>
    <nav className="crumbs">
      <span className="crumb-slash">
        <SlashIcon />
      </span>
      <span className="crumb-btn">
        <span>{workspace}</span>
        <ChevronsUpDown size={14} />
      </span>
      <span className="crumb-slash">
        <SlashIcon />
      </span>
      <span className="crumb-page">{page}</span>
    </nav>
    <div className="navbar-right">
      <span className="credits-chip">
        <CreditsIcon />
        <span>{credits}</span>
      </span>
      <span className="agent-btn" data-click="navbar.agent">
        <SparkIcon />
        <span>Agent</span>
        <kbd>&#8984;J</kbd>
      </span>
      <span className="navbar-icon-btn">
        <SearchIcon />
      </span>
      <span className="navbar-icon-btn">
        <BookIcon />
      </span>
      <span className="navbar-icon-btn">
        <MessageSquarePlusIcon />
      </span>
      <span className="navbar-icon-btn">
        <GiftIcon />
      </span>
    </div>
  </header>
);
