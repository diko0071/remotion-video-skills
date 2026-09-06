import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    files: ["src/scenarios/*/index.tsx", "src/engine/promo/player.tsx"],
    rules: {
      "@remotion/non-pure-animation": "off",
    },
  },
];
