import { Beat, Scenario } from "./scenario";

const D = {
  intro: 12,
  typeSpeed: 0.45,
  attachment: 22,
  sendAndTransition: 16,
  thinking: 26,
  tool: 55,
  say: 40,
  widget: 45,
  panelOpen: 20,
  artifactBuild: 140,
  scroll: 150,
  scrollDistance: 1330,
  hold: 30,
  tail: 40,
};

export type TimedBeat = {
  beat: Beat;
  start: number;
  end: number;
  marks: Record<string, number>;
};

export type ArtifactTiming = {
  openAt: number;
  revealStart: number;
  scrollStart: number;
  scrollEnd: number;
  scrollDistance: number;
};

export type Timeline = {
  beats: TimedBeat[];
  chatStart: number;
  artifact: ArtifactTiming | null;
  duration: number;
};

export const buildTimeline = (scenario: Scenario): Timeline => {
  const beats: TimedBeat[] = [];
  let cursor = D.intro;
  let chatStart = D.intro;
  let artifact: ArtifactTiming | null = null;

  for (const beat of scenario.beats) {
    const start = cursor;
    const marks: Record<string, number> = {};
    let end = start;

    switch (beat.kind) {
      case "prompt": {
        const speed = beat.speed ?? D.typeSpeed;
        const typeFrames = Math.max(10, Math.ceil(beat.text.length / (speed * 10)) * 10);
        marks.typeStart = start;
        marks.typeEnd = start + typeFrames;
        end = marks.typeEnd;
        if (beat.attachments?.length) {
          marks.attachIn = end + 4;
          end += D.attachment + (beat.attachments.length - 1) * 8;
        }
        marks.sendPress = end + 8;
        marks.chatStart = marks.sendPress + 6;
        chatStart = marks.chatStart;
        end = marks.chatStart;
        break;
      }
      case "thinking": {
        end = start + (beat.duration ?? D.thinking);
        break;
      }
      case "tool": {
        marks.startAt = start + (beat.async ? (beat.delay ?? 0) : 0);
        marks.doneAt = marks.startAt + (beat.duration ?? D.tool);
        end = beat.async ? start : marks.doneAt;
        break;
      }
      case "say": {
        end = start + (beat.duration ?? D.say);
        break;
      }
      case "widget": {
        end = start + (beat.duration ?? D.widget);
        break;
      }
      case "artifact": {
        marks.openAt = start;
        marks.revealStart = start + D.panelOpen + 8;
        end = marks.revealStart + (beat.buildDuration ?? D.artifactBuild);
        artifact = {
          openAt: marks.openAt,
          revealStart: marks.revealStart,
          scrollStart: end,
          scrollEnd: end,
          scrollDistance: D.scrollDistance,
        };
        break;
      }
      case "scroll": {
        end = start + (beat.duration ?? D.scroll);
        if (artifact) {
          artifact.scrollStart = start;
          artifact.scrollEnd = end;
          artifact.scrollDistance = beat.distance ?? D.scrollDistance;
        }
        break;
      }
      case "hold": {
        end = start + (beat.duration ?? D.hold);
        break;
      }
    }

    beats.push({ beat, start, end, marks });
    cursor = end;
  }

  return {
    beats,
    chatStart,
    artifact,
    duration: cursor + (scenario.tail ?? D.tail),
  };
};
