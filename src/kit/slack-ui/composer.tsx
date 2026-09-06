import React from "react";
import "./slack.css";
import { SlackIcon } from "./icons";

const FMT_ICONS = [
  "bold",
  "italic",
  "strikethrough",
  "link",
  "numbered-list",
  "bulleted-list",
  "quote",
  "code",
  "code-block",
];

export const SlackComposer: React.FC<{
  placeholder?: string;
  typed?: string;
  cursor?: boolean;
  sendActive?: boolean;
  toolbar?: boolean;
  alsoSendTo?: string;
  style?: React.CSSProperties;
}> = ({
  placeholder = "Message #social",
  typed = "",
  cursor = false,
  sendActive,
  toolbar = true,
  alsoSendTo,
  style,
}) => {
  const active = sendActive ?? typed.length > 0;
  return (
    <div className="sk-composer" style={style}>
      {toolbar ? (
        <div className="fmt-bar">
          {FMT_ICONS.map((ic, i) => (
            <React.Fragment key={ic}>
              {i === 3 || i === 4 || i === 6 || i === 7 ? <span className="sep" /> : null}
              <span className="fbtn"><SlackIcon name={ic} size={16} /></span>
            </React.Fragment>
          ))}
        </div>
      ) : null}
      <div className="input">
        {typed.length === 0 ? (
          <span className="ph">{placeholder}</span>
        ) : (
          <span>
            {typed}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 17,
                background: "var(--sk-ink)",
                verticalAlign: "-3px",
                marginLeft: 1,
                opacity: cursor ? 1 : 0,
              }}
            />
          </span>
        )}
      </div>
      {alsoSendTo ? (
        <div className="sk-also-send">
          <span className="box" />
          Also send to <SlackIcon name="channel" size={13} style={{ margin: "0 -4px" }} /> {alsoSendTo}
        </div>
      ) : null}
      <div className="bottom-bar">
        <span className="plus-btn"><SlackIcon name="plus" size={16} /></span>
        <span className="cbtn"><SlackIcon name="formatting" size={17} /></span>
        <span className="cbtn"><SlackIcon name="emoji" size={17} /></span>
        <span className="cbtn"><SlackIcon name="mentions" size={17} /></span>
        <span className="sep" style={{ width: 1, height: 18, background: "var(--sk-border)", margin: "0 4px" }} />
        <span className="cbtn"><SlackIcon name="video" size={17} /></span>
        <span className="cbtn"><SlackIcon name="microphone" size={17} /></span>
        <span className="cbtn"><SlackIcon name="slash-box" size={17} /></span>
        <span className="spacer" />
        <span className={`sk-send${active ? "" : " idle"}`}>
          <span className="main"><SlackIcon name="send-filled" size={15} /></span>
          <span className="caret"><SlackIcon name="caret-down" size={13} /></span>
        </span>
      </div>
    </div>
  );
};
