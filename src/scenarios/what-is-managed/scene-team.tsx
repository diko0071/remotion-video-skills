import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt, SPRINGS, useSpringAt } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { Pop } from "../../kit/pop";
import { ROLES } from "./data";
import { AgentCard, AGENT } from "./team/agent-card";
import { MiniCreatives } from "./team/mini-creatives";
import { MiniTree } from "./team/mini-tree";
import { MiniWeek } from "./team/mini-week";
import { ROLE, RoleCard } from "./team/role-card";
import { K_TEAM as K } from "./timings";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { P } from "../../kit/product-ui";

const S = 1.95;
const ROW_W = ROLE.w * 3 + ROLE.gap * 2;
const ROW_TOP = zoneTop(180 * S);
const AGENT_TOP = zoneTop(174 * S);

const Mover: React.FC<{ i: number; hideAt: number; children: React.ReactNode }> = ({ i, hideAt, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const m = springAt(f, fps, K.merge, SPRINGS.card);
  const mPrev = springAt(f - 1, fps, K.merge, SPRINGS.card);
  const dx = (1 - i) * (ROLE.w + ROLE.gap);
  const fade = i === 1 ? 1 - ramp(f, hideAt, hideAt + 1) : 1 - ramp(m, 0.55, 0.95);
  return (
    <div style={{ position: "relative", zIndex: i === 1 ? 2 : 1, transform: `translateX(${dx * m}px) scale(${1 - 0.12 * m})`, opacity: fade }}>
      <DirectionalBlur id={`wim-role-${i}`} x={Math.abs(m - mPrev) * Math.abs(dx) * 0.5}>
        {children}
      </DirectionalBlur>
    </div>
  );
};

const AgentIn: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  const s = useSpringAt(at, SPRINGS.pop, 18);
  return <div style={{ opacity: f >= at ? 1 : 0, transform: `scale(${0.94 + 0.06 * s})` }}>{children}</div>;
};

export const TeamScene: React.FC = () => {
  const f = useCurrentFrame();
  const minis = [<MiniTree key="t" at={K.set} />, <MiniCreatives key="c" at={K.creatives} />, <MiniWeek key="w" from={K.check} to={K.day + 4} />];
  const agentAt = K.merge + 9;
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle text="Imagine a team of marketers" at={-8} out={K.agentLine - 4} />
        {f >= K.agentLine - 4 ? <StepTitle text="That team, as one AI agent" at={K.agentLine - 2} /> : null}
        <Zoom w={ROW_W} s={S} top={ROW_TOP}>
          <div style={{ display: "flex", gap: ROLE.gap }}>
            {ROLES.map((r, i) => (
              <Mover key={r.role} i={i} hideAt={agentAt + 1}>
                <Pop at={K.team - 6 + i * 4} from={0.85} rise={14}>
                  <RoleCard role={r.role} task={r.task}>
                    {minis[i]}
                  </RoleCard>
                </Pop>
              </Mover>
            ))}
          </div>
        </Zoom>
        <Zoom w={AGENT.w} s={S} top={AGENT_TOP}>
          <AgentIn at={agentAt}>
            <AgentCard start={agentAt} checks={[K.is, K.one - 4, K.ai + 4]} />
          </AgentIn>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
