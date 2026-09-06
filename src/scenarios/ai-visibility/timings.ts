import { beatGrid } from "../../core/beat";

export const GRID = beatGrid(120, 30);
const { bars } = GRID;

export const T = {
  dashboard: bars(4),
  typePrompt: bars(1.5),
  chat: bars(28),
};

export const P = {
  typeStart: 12,
  typeEnd: 48,
  send: 66,
};

export const D = {
  scrollAt: 80,
  scrollDist: 180,
};

const TOOL_DURS = [
  [68, 86, 62, 90, 74],
  [64, 82, 60, 88, 72],
  [62, 78, 68, 90, 60, 80],
  [64, 74, 60, 84, 70],
];
const OVERLAP = 16;
const SAY_GAP = 34;

const buildChat = () => {
  const groups: Array<Array<{ start: number; done: number }>> = [];
  const says: number[] = [24];
  let cursor = 56;
  for (const durs of TOOL_DURS) {
    const group: Array<{ start: number; done: number }> = [];
    for (const dur of durs) {
      group.push({ start: cursor, done: cursor + dur });
      cursor += dur - OVERLAP;
    }
    groups.push(group);
    cursor += OVERLAP + SAY_GAP;
    says.push(cursor);
    cursor += 32;
  }
  return { groups, says, end: cursor };
};

const chat = buildChat();

export const C = {
  userMsg: 4,
  say0: chat.says[0],
  groups: chat.groups,
  say1: chat.says[1],
  say2: chat.says[2],
  say3: chat.says[3],
  sayFinal: chat.says[4],
  end: chat.end,
};
