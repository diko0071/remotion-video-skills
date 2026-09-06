import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Pulse, Shimmer, SPRINGS, useSpringAt } from "../../core/motion";
import { ChevronRight } from "../ryze-ui/icons";
import type { ChatToolRow, ChatToolRun } from "./types";
import type { ToolRowMarks } from "./timings";

export const prettifyToolName = (name: string): string => {
  const tail = name.split("/").pop() ?? name;
  const spaced = tail
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const skillName = (name: string): string =>
  prettifyToolName(name).replace(/^Pseo\b/, "pSEO");

const GraduationCapIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, position: "relative", top: -2 }}
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

const rowLabel = (row: ChatToolRow, running: boolean): string => {
  if (row.skill) {
    return running ? `Uploading Skill: ${skillName(row.name)}` : `Loaded Skill: ${skillName(row.name)}`;
  }
  const pretty = prettifyToolName(row.name);
  return running ? `Running ${pretty}` : `Ran ${pretty}`;
};

const ToolRow: React.FC<{ row: ChatToolRow; marks: ToolRowMarks; frozen: boolean }> = ({
  row,
  marks,
  frozen,
}) => {
  const p = useSpringAt(marks.start, SPRINGS.smooth, 14);
  const frame = useCurrentFrame();
  const settled = frozen || (frame >= marks.done && row.state !== "running");
  const errored = settled && row.state === "error";
  const label = rowLabel(row, !settled);

  if (!frozen && frame < marks.start) return null;

  return (
    <div>
      <div
        className={`tool-row${errored ? " errored" : ""}`}
        style={
          frozen
            ? undefined
            : { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [-4, 0])}px)` }
        }
      >
        <span className="chev">
          {settled ? (
            <ChevronRight size={16} />
          ) : (
            <Pulse>
              <ChevronRight size={16} />
            </Pulse>
          )}
        </span>
        {row.skill ? <GraduationCapIcon /> : null}
        {settled ? (
          <span className="label" style={errored ? { color: "var(--destructive)" } : undefined}>
            {label}
          </span>
        ) : (
          <Shimmer text={label} />
        )}
      </div>
      {errored && row.error ? (
        <div className="tool-detail">
          <pre className="tool-block destructive">{row.error}</pre>
        </div>
      ) : null}
    </div>
  );
};

export const ToolRunGroup: React.FC<{
  run: ChatToolRun;
  marks: ToolRowMarks[];
  frozen: boolean;
}> = ({ run, marks, frozen }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(marks.length ? marks[0].start - 4 : 0, SPRINGS.smooth, 14);
  const activeIndex = marks.findIndex(
    (m, i) => frame < m.done || run.rows[i].state === "running",
  );
  const running = !frozen && activeIndex !== -1;
  const summary = running
    ? `Running ${
        run.rows[activeIndex].skill
          ? skillName(run.rows[activeIndex].name)
          : prettifyToolName(run.rows[activeIndex].name)
      }`
    : run.summary;
  const visible = frozen ? run.rows.length : marks.filter((m) => frame >= m.start).length;

  if (!frozen && visible === 0) return null;

  return (
    <div
      style={
        frozen
          ? { display: "flex", flexDirection: "column" }
          : {
              display: "flex",
              flexDirection: "column",
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [-4, 0])}px)`,
            }
      }
    >
      <div className="tool-row open">
        <span className="chev" style={{ transform: "rotate(90deg)" }}>
          <ChevronRight size={16} />
        </span>
        {running ? <Shimmer text={summary} /> : <span className="label">{summary}</span>}
      </div>
      <div
        style={{
          marginTop: 16,
          marginLeft: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {run.rows.map((row, i) => (
          <ToolRow key={row.name + i} row={row} marks={marks[i]} frozen={frozen} />
        ))}
      </div>
    </div>
  );
};
