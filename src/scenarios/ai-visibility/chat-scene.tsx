import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { RyzeApp } from "../../kit/ryze-ui/app-shell";
import { AssistantMessage, ChatHeader, Composer, Markdown, UserMessage } from "../../kit/ryze-ui/chat";
import { ToolBeatRow } from "../../kit/ryze-ui/tool-beat-row";
import { C } from "./timings";

const GROUP_A = [
  "Analyzing 24 AI answers across 5 assistants",
  "Reading competitor citations",
  "Building FAQ & comparison hub",
  "Writing “Ember & Oak vs Yankee Candle”",
  "Adding product schema — 24 products",
];

const GROUP_B = [
  "Rewriting Cabin Weekend description",
  "Rewriting Amber Noir description",
  "Rewriting First Snow description",
  "Publishing “cabin scent” buying guide",
  "Adding specs tables to bestsellers",
];

const GROUP_C = [
  "Adding review markup",
  "Writing alt text — 61 images",
  "Adding FAQ schema",
  "Refreshing sitemap",
  "Pinging AI crawlers",
  "Scheduling daily re-checks",
];

const GROUP_D = [
  "Re-checking ChatGPT answers",
  "Re-checking Perplexity answers",
  "Re-checking Gemini answers",
  "Re-checking AI Overviews",
  "Updating visibility score",
];

const Say: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useSpringAt(at, SPRINGS.smooth, 18);
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)` }}>
      <AssistantMessage>
        <Markdown>{children}</Markdown>
      </AssistantMessage>
    </div>
  );
};

const ToolGroupList: React.FC<{ labels: string[]; group: Array<{ start: number; done: number }> }> = ({
  labels,
  group,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "14px 0" }}>
    {labels.map((label, i) => (
      <ToolBeatRow key={label} label={label} start={group[i].start} doneAt={group[i].done} />
    ))}
  </div>
);

export const ChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const userIn = useSpringAt(C.userMsg, SPRINGS.smooth, 16);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);
  React.useLayoutEffect(() => {
    if (!scrollRef.current || !listRef.current) return;
    const next = Math.max(0, listRef.current.scrollHeight - scrollRef.current.clientHeight);
    if (next !== scrollY) setScrollY(next);
  }, [frame, scrollY]);
  return (
    <AbsoluteFill>
        <RyzeApp workspace="emberandoak">
          <div className="chat-page">
            <ChatHeader title="Fix AI visibility" />
            <div className="chat-scroll" ref={scrollRef} style={{ overflow: "hidden" }}>
              <div
                className="chat-messages"
                ref={listRef}
                style={{ margin: "0 auto", transform: `translateY(${-scrollY}px)` }}
              >
                <div
                  style={{
                    opacity: userIn,
                    transform: `translateY(${interpolate(userIn, [0, 1], [12, 0])}px)`,
                  }}
                >
                  <UserMessage>{"Fix my AI visibility"}</UserMessage>
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                  <Say at={C.say0}>
                    <p>
                      Found 7 gaps costing you visibility — starting with the biggest one: AI has no page
                      to quote when shoppers compare candle brands.
                    </p>
                  </Say>
                  <ToolGroupList labels={GROUP_A} group={C.groups[0]} />
                  <Say at={C.say1}>
                    <p>Comparison hub is live. Now making every product machine-readable.</p>
                  </Say>
                  <ToolGroupList labels={GROUP_B} group={C.groups[1]} />
                  <Say at={C.say2}>
                    <p>Pages done. Wiring up the signals assistants actually read.</p>
                  </Say>
                  <ToolGroupList labels={GROUP_C} group={C.groups[2]} />
                  <Say at={C.say3}>
                    <p>All 16 fixes are live. Now re-checking every assistant.</p>
                  </Say>
                  <ToolGroupList labels={GROUP_D} group={C.groups[3]} />
                  <Say at={C.sayFinal}>
                    <p>
                      Done — 16 fixes live. I re-check all 24 answers daily; expect the score to start
                      climbing within two weeks.
                    </p>
                  </Say>
                </div>
              </div>
            </div>
            <Composer />
          </div>
        </RyzeApp>
    </AbsoluteFill>
  );
};
