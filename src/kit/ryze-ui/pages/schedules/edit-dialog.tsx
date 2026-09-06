import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import { CheckIcon, CloseIcon } from "../../icons";
import { PencilIcon, TrashIcon } from "./icons";
import { ScheduleSwitch } from "./switch";
import "./schedules.css";

export type ScheduleRecipients = {
  channels: string[];
  emails: string[];
  addToWorkspace?: boolean;
};

const COST_NOTE =
  "Each run costs 0.5 credits per step the agent takes (tool calls are free; creative generation and SEO data lookups cost extra). The agent can use every tool it has access to — including changing or deleting things in your connected accounts. Write the prompt carefully and use at your own risk.";

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="dlg-field">
    <span className="dlg-label">{label}</span>
    {children}
  </div>
);

const Chevron: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Select: React.FC<{ value: string; narrow?: boolean }> = ({
  value,
  narrow,
}) => (
  <span className={`dlg-select${narrow ? " narrow" : ""}`}>
    <span>{value}</span>
    <Chevron />
  </span>
);

const TagX: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const splitTime = (time: string): [string, string, string] => {
  const [raw, suffix] = time.split(" ");
  const [h, m] = raw.split(":").map(Number);
  if (suffix) return [String(h).padStart(2, "0"), String(m).padStart(2, "0"), suffix];
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return [String(hour).padStart(2, "0"), String(m).padStart(2, "0"), period];
};

export const ScheduleRowMenu: React.FC<{
  at: number;
  editHover?: boolean;
  visible?: boolean;
}> = ({ at, editHover, visible = true }) => {
  const p = useSpringAt(at, SPRINGS.smooth, 14);
  const editScale = useClickPress("schedule.edit");
  return (
    <div
      className="row-menu"
      style={{
        opacity: visible ? p : 0,
        transform: `translateY(${interpolate(p, [0, 1], [-6, 0])}px) scale(${interpolate(p, [0, 1], [0.96, 1])})`,
      }}
    >
      <span
        className={`row-menu-item${editHover ? " hover" : ""}`}
        data-click="schedule.edit"
        style={{ scale: String(editScale) }}
      >
        <PencilIcon />
        Edit
      </span>
      <span className="row-menu-item danger">
        <TrashIcon />
        Delete
      </span>
    </div>
  );
};

export const EditScheduleDialog: React.FC<{
  at: number;
  name: string;
  task: string;
  frequency: string;
  time: string;
  timezone: string;
  recipients: ScheduleRecipients;
  dayOfWeek?: string;
  addedEmailAt?: number;
  saved?: boolean;
  visible?: boolean;
}> = ({
  at,
  name,
  task,
  frequency,
  time,
  timezone,
  recipients,
  dayOfWeek = "Monday",
  addedEmailAt,
  saved,
  visible = true,
}) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const addedIn = useSpringAt(addedEmailAt ?? -1e6, SPRINGS.card, 16);
  const emailsScale = useClickPress("dialog.emails");
  const saveScale = useClickPress("dialog.save");
  const emails = recipients.emails;
  const [hour, minute, period] = splitTime(time);
  return (
    <div className="dlg-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="dlg"
        data-click="schedule.dialog"
        style={{
          transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`,
        }}
      >
        <span className="dlg-close">
          <CloseIcon size={16} />
        </span>
        <div className="dlg-head">
          <div className="dlg-title">Edit scheduled task</div>
          <div className="dlg-desc">{COST_NOTE}</div>
        </div>
        <div className="dlg-body">
          <Field label="Name">
            <span className="dlg-input">{name}</span>
          </Field>
          <Field label="Task">
            <span className="dlg-textarea">{task}</span>
          </Field>
          <Field label="When should this run?">
            <Select value="On a repeating schedule" />
          </Field>
          <Field label="How often should this run?">
            <Select value={frequency} />
          </Field>
          {frequency === "Every week" ? (
            <Field label="On which day?">
              <Select value={dayOfWeek} />
            </Field>
          ) : null}
          <Field label="What time?">
            <div className="dlg-row">
              <Select value={hour} narrow />
              <Select value={minute} narrow />
              <Select value={period} narrow />
            </div>
          </Field>
          <Field label="Timezone">
            <Select value={timezone} />
          </Field>
          <div className="dlg-field">
            <span className="dlg-label">
              <Img
                src={staticFile("integrations/slack.svg")}
                style={{ height: 12, width: 12 }}
              />
              Slack channels
            </span>
            <Select
              value={
                recipients.channels.length === 0
                  ? "No channels"
                  : `${recipients.channels.length} selected`
              }
            />
            <span className="dlg-hint">
              For a private channel, invite @Ryze AI there first.
            </span>
          </div>
          <div className="dlg-field">
            <span className="dlg-label">Email recipients</span>
            <div
              className="dlg-tags"
              data-click="dialog.emails"
              style={{ scale: String(emailsScale) }}
            >
              {emails.map((email, i) => (
                <span
                  className="dlg-tag"
                  key={email}
                  style={
                    addedEmailAt !== undefined && emails.length > 1 && i === emails.length - 1
                      ? {
                          opacity: addedIn,
                          transform: `scale(${interpolate(addedIn, [0, 1], [0.9, 1])})`,
                        }
                      : undefined
                  }
                >
                  {email}
                  <TagX />
                </span>
              ))}
            </div>
          </div>
          <div className="dlg-switch-row">
            <span className="dlg-switch-label">
              Also add recipients to this workspace
            </span>
            <ScheduleSwitch on={recipients.addToWorkspace} />
          </div>
        </div>
        <div className="dlg-foot">
          <span className="btn-outline">Cancel</span>
          <span
            className="btn-primary"
            data-click="dialog.save"
            style={{ scale: String(saveScale) }}
          >
            {saved ? (
              <>
                <CheckIcon size={14} />
                Saved
              </>
            ) : (
              "Save"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
