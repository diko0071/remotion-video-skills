export const FPS = 30;
export const TOTAL = 623;

export const SHOTS = {
  typeIn: { from: 0, duration: 26 },
  appWork: { from: 26, duration: 53 },
  moneyBloom: { from: 79, duration: 42 },
  wideSession: { from: 121, duration: 58 },
  adArrives: { from: 179, duration: 37 },
  adHold: { from: 216, duration: 30 },
  curlToSite: { from: 246, duration: 8 },
  siteFull: { from: 254, duration: 30 },
  curlToPhone: { from: 284, duration: 7 },
  phone: { from: 291, duration: 62 },
  kinetic: { from: 353, duration: 83 },
  settingsWide: { from: 436, duration: 23 },
  settingsMacro: { from: 459, duration: 35 },
  settingsCascade: { from: 494, duration: 46 },
  endcard: { from: 540, duration: 83 },
} as const;

export const PALETTE = {
  black: "#080808",
  panel: "#0F0F0F",
  panelSoft: "#131313",
  chip: "#1A1A1A",
  line: "#232323",
  lineSoft: "#2A2A2A",
  text: "#EDEDED",
  textDim: "#9A9A9A",
  textFaint: "#6B6B6B",
  lime: "#CBF52B",
  limeSoft: "#A9CE2C",
} as const;
