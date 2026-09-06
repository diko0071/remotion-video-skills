import React from "react";

export type StatementAlign = "top" | "middle" | "bottom";

export type StatementPart =
  | { kind: "text"; text: string; align?: StatementAlign }
  | { kind: "image"; src: string; height?: number; align?: StatementAlign };

export type PromoScene =
  | { kind: "custom"; render: React.ComponentType; duration: number }
  | { kind: "title"; heading: string; headingNode?: React.ReactNode; sub?: string; duration?: number }
  | {
      kind: "card";
      heading?: string;
      check?: boolean;
      node: React.ReactNode;
      cardWidth?: number;
      bare?: boolean;
      duration?: number;
    }
  | {
      kind: "showcase";
      heading: string;
      check?: boolean;
      images: string[];
      columns?: number;
      duration?: number;
    }
  | {
      kind: "statement";
      left?: string;
      image?: string;
      right?: string;
      imageHeight?: number;
      parts?: StatementPart[];
      background?: string;
      ink?: string;
      align?: "left" | "center";
      caption?: string;
      captionBackground?: string;
      captionInk?: string;
      duration?: number;
    }
  | {
      kind: "lockup";
      mark: string;
      word: string;
      partner?: { word: string; mark?: string; showWord?: boolean };
      tagline?: string;
      background?: string;
      ink?: string;
      duration?: number;
    }
  | {
      kind: "outro";
      logo?: string;
      heading: string;
      pill?: string;
      footnote?: string;
      duration?: number;
    };

export type PromoScenario = {
  id: string;
  caption?: string;
  format: "square" | "vertical" | "wide";
  background?: string;
  ink?: string;
  accent?: string;
  transition?: "fade" | "cut";
  scenes: PromoScene[];
};

export const PROMO_SIZES: Record<PromoScenario["format"], { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  vertical: { width: 1080, height: 1920 },
  wide: { width: 1920, height: 1080 },
};

export const SCENE_DEFAULTS: Record<PromoScene["kind"], number> = {
  custom: 180,
  statement: 130,
  lockup: 150,
  title: 90,
  card: 170,
  showcase: 180,
  outro: 120,
};

export const FADE = 10;

export const promoSceneDuration = (scene: PromoScene): number =>
  scene.duration ?? SCENE_DEFAULTS[scene.kind];

export const promoDuration = (scenario: PromoScenario): number =>
  scenario.scenes.reduce((sum, s) => sum + promoSceneDuration(s), 0);
