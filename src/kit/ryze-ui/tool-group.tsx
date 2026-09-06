import React from "react";
import { ChevronRight } from "./icons";
import { Pulse, Shimmer } from "../../core/motion";

type ToolState = "collapsed" | "expanded" | "running" | "error";

export const ToolGroup: React.FC<{
  state: ToolState;
  label: string;
  input?: string;
  output?: string;
  error?: string;
}> = ({ state, label, input, output, error }) => (
  <div className="tool-group">
    <div className={`tool-row${state === "expanded" || state === "error" ? " open" : ""}${state === "error" ? " errored" : ""}`}>
      <span className="chev" style={state === "expanded" || state === "error" ? { transform: "rotate(90deg)" } : undefined}>
        {state === "running" ? (
          <Pulse>
            <ChevronRight size={16} />
          </Pulse>
        ) : (
          <ChevronRight size={16} />
        )}
      </span>
      {state === "running" ? <Shimmer text={label} /> : <span className="label">{label}</span>}
    </div>
    {state === "expanded" && (input || output) ? (
      <div className="tool-detail">
        {input ? <pre className="tool-block">{input}</pre> : null}
        {output ? <pre className="tool-block">{output}</pre> : null}
      </div>
    ) : null}
    {state === "error" && error ? (
      <div className="tool-detail">
        <pre className="tool-block destructive">{error}</pre>
      </div>
    ) : null}
  </div>
);
