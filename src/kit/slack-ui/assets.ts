export const SLACK_AVATARS = {
  dmitry: "slack/avatar-dmitry.png",
  ryze: "slack/avatar-ryze.png",
  sarah: "slack/avatar-sarah.png",
  marcus: "slack/avatar-marcus.png",
  elena: "slack/avatar-elena.png",
  james: "slack/avatar-james.png",
  priya: "slack/avatar-priya.png",
  tom: "slack/avatar-tom.png",
  nina: "slack/avatar-nina.png",
  diego: "slack/avatar-diego.png",
} as const;

export const SLACK_CAST = {
  sarah: { avatar: SLACK_AVATARS.sarah, name: "Sarah Mitchell" },
  marcus: { avatar: SLACK_AVATARS.marcus, name: "Marcus Reed" },
  elena: { avatar: SLACK_AVATARS.elena, name: "Elena Novak" },
  james: { avatar: SLACK_AVATARS.james, name: "James Carter" },
  priya: { avatar: SLACK_AVATARS.priya, name: "Priya Sharma" },
  tom: { avatar: SLACK_AVATARS.tom, name: "Tom Gallagher" },
  nina: { avatar: SLACK_AVATARS.nina, name: "Nina Park" },
  diego: { avatar: SLACK_AVATARS.diego, name: "Diego Alvarez" },
  ryze: { avatar: SLACK_AVATARS.ryze, name: "Ryze AI" },
} as const;

export const SLACK_EMOJI = {
  eyes: "slack/emoji-eyes.png",
  wave: "slack/emoji-wave.png",
  fire: "slack/emoji-fire.png",
  raisedHands: "slack/emoji-raised-hands.png",
  hundred: "slack/emoji-hundred.png",
  chartUp: "slack/emoji-chart-up.png",
} as const;
