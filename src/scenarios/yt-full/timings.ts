export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const T = {
  insert1At: sec(22.78),
  face2At: sec(37.5),
  auditAt: sec(45.2),
  auditJumpAt: sec(69.84),
  face3At: sec(87.88),
  articlesAt: sec(92.28),
  blogStudioAt: sec(110.94),
  insert2At: sec(129.98),
  adsAt: sec(135.38),
  compAdsAt: sec(147.7),
  creativesAt: sec(155.74),
  face4At: sec(167.18),
  approvalsAt: sec(179.02),
  face5At: sec(197.46),
  outroAt: sec(207.94),
  total: sec(218),
} as const;

export const FOOTAGE = {
  audit: { src: "yt/chat-take2.mp4", fromA: sec(2), fromB: sec(58) },
  tour: { src: "yt/tour5.mp4", fromA: sec(1), fromB: sec(22.5) },
  ads: { src: "yt/intro-ryze.mp4", fromA: sec(57), fromB: sec(71), fromC: sec(83) },
} as const;
