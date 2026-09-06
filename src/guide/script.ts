export type VoMarks = Record<string, { text: string; words: { word: string; start: number }[] }>;

export type GuideAction = {
  on: string | number;
  after?: number;
  click?: string;
  press?: boolean;
  set?: string;
  scroll?: number;
  scrollTo?: string;
  align?: "start" | "end";
  margin?: number;
  near?: boolean;
};

export type GuideAct = {
  vo: string;
  actions?: GuideAction[];
  hold?: number;
  gap?: number;
};

export type GuideCue = {
  act: GuideAct;
  start: number;
  end: number;
  actions: {
    frame: number;
    click?: string;
    press?: boolean;
    set?: string;
    near?: boolean;
  }[];
};

export const FPS = 30;
const GAP = 10;
const TAIL = 12;
const MIN_CLICK_GAP = 30;
const MIN_CLICK_GAP_NEAR = 15;

export type GuideScrollStop = {
  at: number;
  to: string;
  align?: "start" | "end";
  margin?: number;
};

export type GuideTimeline = {
  cues: GuideCue[];
  at: (name: string) => number;
  clicks: { target: string; at: number; press?: boolean }[];
  scrolls: { at: number; px: number }[];
  scrollStops: GuideScrollStop[];
  total: number;
};

export const titleHold = (durations: Record<string, number>, key = "00-title"): number =>
  Math.ceil(durations[key] * FPS) + 20;

export const buildTimeline = (
  acts: GuideAct[],
  marks: VoMarks,
  durations: Record<string, number>,
  from = 24,
): GuideTimeline => {
  const wordFrame = (line: string, word: string): number => {
    const entry = marks[line];
    const needle = word.toLowerCase();
    const hit = entry?.words.find((w) => w.word === needle);
    if (!hit) {
      throw new Error(
        `guide: word "${word}" not found in VO line "${line}". Words: ${entry?.words
          .map((w) => w.word)
          .join(" ")}`,
      );
    }
    return Math.round(hit.start * FPS);
  };

  const cues: GuideCue[] = [];
  const scrolls: { at: number; px: number }[] = [];
  const scrollStops: GuideScrollStop[] = [];
  const states = new Map<string, number>();
  let cursor = from;

  for (const act of acts) {
    const start = cursor;
    const voFrames = Math.ceil(durations[act.vo] * FPS);
    const actions = (act.actions ?? []).map((action) => {
      const base =
        typeof action.on === "number" ? action.on : wordFrame(act.vo, action.on);
      const frame = start + base + (action.after ?? 0);
      if (action.set) states.set(action.set, frame);
      if (action.scroll !== undefined) scrolls.push({ at: frame, px: action.scroll });
      if (action.scrollTo !== undefined)
        scrollStops.push({ at: frame, to: action.scrollTo, align: action.align, margin: action.margin });
      if (action.click && !action.set && action.press !== false) {
        console.warn(
          `guide: click "${action.click}" in ${act.vo} sets no state — what changes on screen after this click?`,
        );
      }
      return {
        frame,
        click: action.click,
        press: action.press,
        set: action.set,
        near: action.near,
      };
    });
    const lastAction = actions.length ? Math.max(...actions.map((a) => a.frame)) : start;
    const end = Math.max(start + voFrames + TAIL, lastAction + (act.hold ?? 12));
    cues.push({ act, start, end, actions });
    cursor = end + (act.gap ?? GAP);
  }

  const orderedClicks = cues
    .flatMap((cue) =>
      cue.actions
        .filter((a) => a.click)
        .map((a) => ({
          target: a.click as string,
          at: a.frame,
          press: a.press,
          near: a.near,
        })),
    )
    .sort((a, b) => a.at - b.at);

  for (let i = 1; i < orderedClicks.length; i++) {
    const prev = orderedClicks[i - 1];
    const next = orderedClicks[i];
    const gap = next.at - prev.at;
    const floor = next.near ? MIN_CLICK_GAP_NEAR : MIN_CLICK_GAP;
    if (gap < floor) {
      throw new Error(
        `guide: clicks "${prev.target}" (frame ${prev.at}) and "${next.target}" (frame ${next.at}) are ${gap} frames apart — the cursor cannot travel and press in under ${floor}. Anchor them on words further apart, or mark the second action \`near: true\` when both targets sit side by side in the same dialog.`,
      );
    }
  }

  return {
    cues,
    at: (name: string) => {
      const frame = states.get(name);
      if (frame === undefined) throw new Error(`guide: state "${name}" is never set`);
      return frame;
    },
    scrolls,
    scrollStops,
    clicks: orderedClicks,
    total: cues[cues.length - 1].end,
  };
};
