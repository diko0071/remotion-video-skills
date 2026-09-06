import { answerBlocks, type ChatTurn } from "./types";

export const TYPE_SPEED = 0.5;
export const LEAD_IN = 6;
export const SEND_PAUSE = 7;
export const USER_GAP = 2;
export const REASONING_GAP = 20;
export const TOOLS_GAP = 22;
export const TOOL_BEAT = 46;
export const TOOL_SETTLE = 14;
export const ANSWER_GAP = 26;
export const RESULT_GAP = 22;
export const ARTIFACT_GAP = 18;
export const TURN_TAIL = 34;

export type ToolRowMarks = {
  start: number;
  done: number;
};

export type TurnMarks = {
  from: number;
  typeFrom: number;
  typeTo: number;
  sendAt: number;
  userAt: number;
  reasoningAt: number;
  reasoningDone: number;
  toolsAt: number;
  rows: ToolRowMarks[];
  answerAt: number;
  resultAt: number;
  artifactAt: number;
  end: number;
};

export const turnMarks = (turn: ChatTurn, from = 0): TurnMarks => {
  const typeFrom = from + LEAD_IN;
  const typeTo = turn.instant ? typeFrom : typeFrom + Math.ceil(turn.prompt.length / TYPE_SPEED);
  const sendAt = turn.instant ? typeTo : typeTo + SEND_PAUSE;
  const userAt = sendAt + USER_GAP;

  const reasoningAt = userAt + REASONING_GAP;
  const reasoningDone = turn.reasoning
    ? reasoningAt + Math.max(26, Math.round(turn.reasoning.seconds * 22))
    : reasoningAt;

  const toolsAt = turn.reasoning ? reasoningDone + TOOLS_GAP : userAt + TOOLS_GAP;
  const rows = (turn.tools?.rows ?? []).map((_, i) => ({
    start: toolsAt + i * TOOL_BEAT,
    done: toolsAt + i * TOOL_BEAT + TOOL_BEAT - TOOL_SETTLE,
  }));

  const toolsEnd = rows.length ? rows[rows.length - 1].done : toolsAt;
  const answerAt = toolsEnd + ANSWER_GAP;
  const resultAt = answerAt + (answerBlocks(turn.answer).length ? RESULT_GAP : 0);
  const artifactAt = resultAt + (turn.result ? ARTIFACT_GAP : 0);
  const last = turn.artifact ? artifactAt : turn.result ? resultAt : answerAt;

  return {
    from,
    typeFrom,
    typeTo,
    sendAt,
    userAt,
    reasoningAt,
    reasoningDone,
    toolsAt,
    rows,
    answerAt,
    resultAt,
    artifactAt,
    end: last + TURN_TAIL,
  };
};

export const turnDuration = (turn: ChatTurn): number => turnMarks(turn).end;

export const conversationMarks = (turns: ChatTurn[]): TurnMarks[] => {
  const out: TurnMarks[] = [];
  let cursor = 0;
  for (const turn of turns) {
    const marks = turnMarks(turn, cursor);
    out.push(marks);
    cursor = marks.end;
  }
  return out;
};

export const conversationDuration = (turns: ChatTurn[]): number => {
  const marks = conversationMarks(turns);
  return marks.length ? marks[marks.length - 1].end : 0;
};
