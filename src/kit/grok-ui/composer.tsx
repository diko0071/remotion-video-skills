import React from "react";
import "./grok.css";
import { MicIcon, PlusIcon } from "./icons";

export const GrokComposer: React.FC<{ typed?: string; caret?: boolean; placeholder?: string }> = ({
  typed = "",
  caret = false,
  placeholder = "Message Grok",
}) => (
  <div className="gk-composer-wrap">
    <div className="gk-composer" data-click="gk.composer">
      <span className="gk-circle">
        <PlusIcon size={20} />
      </span>
      <span className="gk-composer-text">
        {typed.length === 0 ? <span className="ph">{placeholder}</span> : typed}
        {caret ? <span className="gk-caret" /> : null}
      </span>
      <span className="gk-circle dark">
        <MicIcon size={20} />
      </span>
    </div>
  </div>
);
