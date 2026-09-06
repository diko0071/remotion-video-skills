import React from "react";

export type ArtifactSceneProps = {
  revealStart: number;
  scrollStart: number;
  scrollEnd: number;
  scrollDistance: number;
};

export type Beat =
  | {
      kind: "prompt";
      text: string;
      speed?: number;
      attachments?: Array<{ name: string; image: string; meta?: string }>;
    }
  | { kind: "thinking"; duration?: number }
  | { kind: "tool"; label: string; duration?: number; async?: boolean; delay?: number }
  | { kind: "say"; text: React.ReactNode; duration?: number }
  | { kind: "widget"; node: React.ReactNode; duration?: number }
  | {
      kind: "artifact";
      title: string;
      scene: React.ComponentType<ArtifactSceneProps>;
      width?: number;
      buildDuration?: number;
    }
  | { kind: "scroll"; duration?: number; distance?: number }
  | { kind: "hold"; duration?: number };

export type Scenario = {
  id: string;
  workspace: string;
  chatTitle: string;
  welcome?: string;
  beats: Beat[];
  tail?: number;
  sfx?: boolean;
};
