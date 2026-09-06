import React from "react";
import { CheckIcon } from "../../icons";
import "./seo-home.css";
import { SpinnerIcon } from "./icons";
import { SetupState } from "./types";

export const StateMark: React.FC<{ state: SetupState }> = ({ state }) => {
  if (state === "active") {
    return (
      <span className="sh-spin">
        <SpinnerIcon />
      </span>
    );
  }
  return (
    <span className={`sh-box${state === "done" ? " checked" : ""}`}>
      {state === "done" ? <CheckIcon /> : null}
    </span>
  );
};
