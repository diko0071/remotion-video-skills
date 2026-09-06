import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../../core/motion";
import { useClickPress } from "../../../core/press-context";
import "./creatives-guide.css";

const HINT = "Tap on the image to add comments";
export const NOTE_1 = "make the headline bigger";
export const NOTE_2 = "swap this to the amber jar";

const SPOTS = [
  { id: "lb.spot1", x: 50, y: 14 },
  { id: "lb.spot2", x: 63, y: 56 },
];

const Pin: React.FC<{ n: number; x: number; y: number; at: number }> = ({ n, x, y, at }) => {
  const p = useSpringAt(at, SPRINGS.pop, 12);
  return (
    <span
      className="lbx-pin"
      style={{ left: `${x}%`, top: `${y}%`, scale: String(p), opacity: p }}
    >
      {n}
    </span>
  );
};

const NoteBox: React.FC<{
  x: number;
  y: number;
  at: number;
  typeAt: number;
  text: string;
  until?: number;
}> = ({ x, y, at, typeAt, text, until }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.panel, 14);
  const typed = typing(frame, text, typeAt + 6, typeAt + 6 + Math.ceil(text.length / 0.9));
  if (until !== undefined && frame >= until) return null;
  return (
    <div
      className="lbx-note"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [6, 0])}px)`,
      }}
    >
      {typed}
      <span className="lbx-caret" style={{ opacity: frame % 24 < 12 ? 1 : 0 }} />
    </div>
  );
};

const MarkRow: React.FC<{ n: number; note: string; noteAt: number; last?: boolean }> = ({
  n,
  note,
  noteAt,
  last,
}) => {
  const frame = useCurrentFrame();
  const typed = typing(frame, note, noteAt + 6, noteAt + 6 + Math.ceil(note.length / 0.9));
  return (
    <div className={`lbx-mark-row${last ? " last" : ""}`}>
      <span className="lbx-pin static">{n}</span>
      <span className="lbx-mark-note">
        {typed.length ? typed : <i>No note yet</i>}
      </span>
    </div>
  );
};

export const AnnotateDialog: React.FC<{
  at: number;
  visible: boolean;
  pin1At: number;
  note1At: number;
  pin2At: number;
  note2At: number;
}> = ({ at, visible, pin1At, note1At, pin2At, note2At }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const sendScale = useClickPress("lb.send");
  return (
    <div className="lbx-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="lbx"
        data-click="lb.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <div className="lbx-media">
          <Img src={staticFile("creatives/autumn-02.jpg")} className="lbx-img" />
          {SPOTS.map((spot) => (
            <span
              key={spot.id}
              className="lbx-spot"
              data-click={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            />
          ))}
          {frame >= pin1At ? <Pin n={1} x={SPOTS[0].x} y={SPOTS[0].y} at={pin1At} /> : null}
          {frame >= pin1At ? (
            <NoteBox x={SPOTS[0].x} y={SPOTS[0].y} at={pin1At} typeAt={note1At} text={NOTE_1} until={pin2At} />
          ) : null}
          {frame >= pin2At ? <Pin n={2} x={SPOTS[1].x} y={SPOTS[1].y} at={pin2At} /> : null}
          {frame >= pin2At ? (
            <NoteBox x={SPOTS[1].x} y={SPOTS[1].y} at={pin2At} typeAt={note2At} text={NOTE_2} />
          ) : null}
        </div>
        <div className="lbx-side">
          <h4>Add comments</h4>
          <p className="lbx-hint">{HINT}</p>
          <div className="lbx-marks">
            {frame >= pin1At ? <MarkRow n={1} note={NOTE_1} noteAt={note1At} /> : null}
            {frame >= pin2At ? <MarkRow n={2} note={NOTE_2} noteAt={note2At} last /> : null}
          </div>
          <div className="lbx-actions">
            <span className="btn-primary" data-click="lb.send" style={{ scale: String(sendScale) }}>
              Send
            </span>
            <span className="btn-outline">Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
