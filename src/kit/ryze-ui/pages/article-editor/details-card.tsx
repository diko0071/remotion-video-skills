import React from "react";
import "../../pages.css";
import "./article-editor.css";
import {
  ARTICLE_EDITOR_DETAILS_TITLE,
  ARTICLE_EDITOR_FIELDS,
  ARTICLE_EDITOR_FIELD_LABELS,
} from "./data";
import { ChevronDownIcon } from "./icons";
import {
  META_DESCRIPTION_MAX,
  META_TITLE_MAX,
  type ArticleDraftFields,
} from "./types";

const Field: React.FC<{
  label: string;
  counter?: { length: number; max: number };
  children: React.ReactNode;
}> = ({ label, counter, children }) => (
  <div className="ae-field">
    <div className="ae-field-top">
      <span className="ae-field-label">{label}</span>
      {counter ? (
        <span className="ae-field-counter">
          {counter.length}/{counter.max}
        </span>
      ) : null}
    </div>
    {children}
  </div>
);

export const ArticleDetailsCard: React.FC<{
  fields?: ArticleDraftFields;
  style?: React.CSSProperties;
}> = ({ fields = ARTICLE_EDITOR_FIELDS, style }) => (
  <div className="ae-card" style={style}>
    <span className="ae-card-title">{ARTICLE_EDITOR_DETAILS_TITLE}</span>
    <Field label={ARTICLE_EDITOR_FIELD_LABELS.slug}>
      <span className="ae-input">{fields.slug}</span>
    </Field>
    <Field label={ARTICLE_EDITOR_FIELD_LABELS.scheduledAt}>
      <span className="ae-datepicker">
        {fields.scheduledAt.split(" ").map((part) => (
          <span className="ae-select" key={part}>
            <span>{part}</span>
            <ChevronDownIcon />
          </span>
        ))}
      </span>
    </Field>
    <Field
      label={ARTICLE_EDITOR_FIELD_LABELS.metaTitle}
      counter={{ length: fields.metaTitle.length, max: META_TITLE_MAX }}
    >
      <span className="ae-input">{fields.metaTitle}</span>
    </Field>
    <Field
      label={ARTICLE_EDITOR_FIELD_LABELS.metaDescription}
      counter={{
        length: fields.metaDescription.length,
        max: META_DESCRIPTION_MAX,
      }}
    >
      <span className="ae-textarea">{fields.metaDescription}</span>
    </Field>
  </div>
);
