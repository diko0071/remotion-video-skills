import React from "react";
import { Img, staticFile } from "remotion";
import "./muse.css";
import { ArrowUpIcon, CloseIcon, MicIcon, PlusIcon } from "./icons";

export const MuseComposer: React.FC<{
  typed?: string;
  caret?: boolean;
  placeholder?: string;
  attachments?: string[];
  sending?: boolean;
  width?: number;
  id?: string;
  sendId?: string;
}> = ({ typed = "", caret = false, placeholder = "Message", attachments = [], sending = false, width, id = "mu.composer", sendId = "mu.send" }) => (
  <div className="mu-composer-wrap">
    <div className="mu-composer" style={width ? { width } : undefined} data-click={id}>
      {attachments.length ? (
        <div className="mu-attach">
          {attachments.map((f) => (
            <span key={f} className="mu-attach-chip">
              <Img src={staticFile(f)} />
              <span className="mu-attach-x">
                <CloseIcon size={13} />
              </span>
            </span>
          ))}
        </div>
      ) : null}
      <div className="mu-composer-row">
        <PlusIcon size={26} />
        <span className="mu-composer-text">
          {typed.length === 0 ? <span className="ph">{placeholder}</span> : typed}
          {caret ? <span className="mu-caret" /> : null}
        </span>
        <MicIcon size={26} />
        <span className={"mu-send" + (sending ? " stop" : typed.length ? " on" : "")} data-click={sendId}>
          {sending ? <span /> : <ArrowUpIcon size={20} />}
        </span>
      </div>
    </div>
  </div>
);
