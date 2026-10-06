import React from "react";
import { ClaudeWelcomeStage } from "../../kit/claude-ui";
import { CLAUDE_BG, PROMPT, SEND, TYPE, UI, UI_SCALE, WELCOME } from "./timings";

export const WelcomeScene: React.FC = () => (
  <ClaudeWelcomeStage prompt={PROMPT} type={TYPE} send={SEND} model="Fable 5" modelVariant="Max" welcome={WELCOME} ui={{ ...UI, scale: UI_SCALE }} background={CLAUDE_BG} />
);
