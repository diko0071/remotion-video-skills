import React from "react";
import "../../pages.css";
import "./seo-settings.css";
import { SectionRow, SettingsSection } from "./settings-section";
import { ChevronDownIcon } from "../../icons";

const Select: React.FC<{ value: string; sub?: string; id?: string }> = ({ value, sub, id }) => (
  <span className="st-select" data-click={id}>
    <span className="st-select-text">
      {value}
      {sub ? <span className="st-select-sub">{sub}</span> : null}
    </span>
    <ChevronDownIcon />
  </span>
);

export const LanguageSection: React.FC<{ language?: string; market?: string }> = ({
  language = "English",
  market = "United States",
}) => (
  <SettingsSection title="Language & Region" hint="Articles are written in this language for this market.">
    <SectionRow
      label="Article language"
      hint="Every generated article is written in this language."
      control={<Select value={language} id="st.language" />}
    />
    <SectionRow
      label="Target market"
      hint="Search data and keyword research use this market."
      control={<Select value={market} id="st.market" />}
    />
  </SettingsSection>
);

export const WritingSection: React.FC<{
  length?: string;
  lengthSub?: string;
  tone?: string;
  toneTyped?: string;
  instructions?: string;
  instructionsTyped?: string;
  examplesLabel?: string;
}> = ({
  length = "Dynamic",
  lengthSub = "Adapts to search intent",
  tone,
  toneTyped,
  instructions,
  instructionsTyped,
  examplesLabel = "No examples yet",
}) => (
  <SettingsSection title="Writing" hint="How the writing sounds and how long it runs.">
    <SectionRow
      label="Article length"
      hint="Word count target for generated articles."
      control={<Select value={length} sub={lengthSub} id="st.length" />}
    />
    <SectionRow
      label="Tone of voice"
      stacked
      control={
        <span className={`st-textarea${!tone && !toneTyped ? " empty" : ""}`} data-click="st.tone">
          {toneTyped ?? tone ?? "Confident, practical, no fluff…"}
          {toneTyped !== undefined ? <span className="st-caret" /> : null}
        </span>
      }
    />
    <SectionRow
      label="Article examples"
      hint="Reference posts the writer mimics for structure and style."
      control={
        <span className="btn-outline btn-sm" data-click="st.examples">
          {examplesLabel}
        </span>
      }
    />
    <SectionRow
      label="Custom writing instructions"
      stacked
      control={
        <span
          className={`st-textarea tall${!instructions && !instructionsTyped ? " empty" : ""}`}
          data-click="st.instructions"
        >
          {instructionsTyped ?? instructions ?? "Anything the writer should always do or avoid…"}
          {instructionsTyped !== undefined ? <span className="st-caret" /> : null}
        </span>
      }
    />
  </SettingsSection>
);
