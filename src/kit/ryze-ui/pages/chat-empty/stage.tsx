import React from "react";
import { Composer } from "../../composer";
import "./chat-empty.css";
import {
  ACTIONS,
  CARDS,
  FAN_LEFT,
  HERO_FAN,
  HERO_REST,
  HERO_VERB,
  SHELF_ALL_LABEL,
  SHELF_TITLE,
} from "./data";
import { ChatEmptyDraftShelf } from "./draft-shelf";
import { ChatEmptyHero } from "./hero";
import { ChatEmptyShelf } from "./playbook-shelf";

export const ChatEmptyStage: React.FC<{ composer?: React.ReactNode }> = ({
  composer,
}) => (
  <div className="ce-wrap">
    <div className="ce-stage">
      <ChatEmptyHero
        verb={HERO_VERB}
        rest={HERO_REST}
        fan={HERO_FAN}
        fanLeft={FAN_LEFT}
      />

      <div className="ce-input-slot">
        {composer ?? <Composer approval="Skip" flatRing />}
        <ChatEmptyDraftShelf actions={ACTIONS} />
      </div>

      <ChatEmptyShelf
        title={SHELF_TITLE}
        allLabel={SHELF_ALL_LABEL}
        cards={CARDS}
      />
    </div>
  </div>
);
