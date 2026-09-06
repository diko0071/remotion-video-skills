import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../core/press-context";
import { CheckIcon } from "./icons";

type Option = {
  label: string;
  selected?: boolean;
  id?: string;
  logos?: string[];
};

const OptionPill: React.FC<{ option: Option }> = ({ option }) => {
  const scale = useClickPress(option.id);
  return (
    <span
      className={`pill${option.selected ? " selected" : ""}`}
      data-click={option.id}
      style={{
        ...(option.logos
          ? { display: "inline-flex", alignItems: "center", gap: 7 }
          : null),
        scale: String(scale),
      }}
    >
      {option.logos?.map((logo) => (
        <Img
          key={logo}
          src={staticFile(logo)}
          style={{ height: "1.1em", width: "auto", display: "block" }}
        />
      ))}
      {option.label}
    </span>
  );
};

export const QuestionSection: React.FC<{
  title: string;
  options: Option[];
  customInput?: string;
  dimmed?: boolean;
}> = ({ title, options, customInput, dimmed }) => (
  <div className="q-section">
    <div className="q-title">{title}</div>
    <div className="q-options" style={dimmed ? { opacity: 0.5 } : undefined}>
      {options.map((o) => (
        <OptionPill key={o.label} option={o} />
      ))}
    </div>
    {customInput ? <div className="q-custom">{customInput}</div> : null}
  </div>
);

export const SubmitButton: React.FC<{
  submitted?: boolean;
  label?: string;
}> = ({ submitted, label }) => {
  const scale = useClickPress("widget.submit");
  return submitted ? (
    <span
      className="btn-primary disabled"
      data-click="widget.submit"
      style={{ scale: String(scale) }}
    >
      <CheckIcon size={14} />
      Submitted
    </span>
  ) : (
    <span
      className="btn-primary"
      data-click="widget.submit"
      style={{ scale: String(scale) }}
    >
      {label ?? "Submit"}
    </span>
  );
};
