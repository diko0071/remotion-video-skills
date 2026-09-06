import React from "react";
import { useCurrentFrame } from "remotion";
import { blink, press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { RyzeApp } from "../ryze-ui/app-shell";
import { ChatPage } from "../ryze-ui/chat-page";
import { Composer } from "../ryze-ui/composer";
import { ArtifactShell } from "../ryze-ui/pages/chat-artifact";
import "./chat.css";
import { ArtifactPanelBody, isSiteArtifact } from "./artifacts/panel";
import { ChatEmptyStage } from "../ryze-ui/pages/chat-empty";
import { turnMarks } from "./timings";
import { ChatTurnBlock } from "./turn";
import type { ChatTurn } from "./types";

const ANCHOR_TOP = 28;

const useAnchoredScroll = (progress: number) => {
  const frame = useCurrentFrame();
  const listRef = React.useRef<HTMLDivElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const prevAnchorRef = React.useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);
  React.useLayoutEffect(() => {
    const list = listRef.current;
    const scroller = list?.closest(".chat-scroll");
    if (!list || !scroller) return;
    const top = (el: HTMLDivElement | null) =>
      el ? Math.max(0, el.offsetTop - list.offsetTop - ANCHOR_TOP) : null;
    const max = Math.max(0, list.scrollHeight - scroller.clientHeight);
    const from = top(prevAnchorRef.current) ?? max;
    const to = top(anchorRef.current) ?? max;
    const target = from + (to - from) * progress;
    if (Math.abs(target - scrollY) > 0.5) setScrollY(target);
  }, [progress, frame, scrollY]);
  return { listRef, anchorRef, prevAnchorRef, scrollY };
};

export const ChatConversation: React.FC<{
  title: string;
  turns: ChatTurn[];
  active: number;
  workspace?: string;
  chrome?: "app" | "bare";
  menu?: React.ReactNode;
}> = ({ title, turns, active, workspace = "ember-and-oak", chrome = "app", menu }) => {
  const frame = useCurrentFrame();
  const marksForScroll = turnMarks(turns[active]);
  const scrollProgress = useSpringAt(marksForScroll.userAt, SPRINGS.smooth, 16);
  const artifactProgress = useSpringAt(marksForScroll.artifactAt, SPRINGS.panel, 22);
  const { listRef, anchorRef, prevAnchorRef, scrollY } = useAnchoredScroll(scrollProgress);

  const turn = turns[active];
  const marks = turnMarks(turn);
  const typed = frame < marks.sendAt ? typing(frame, turn.prompt, marks.typeFrom, marks.typeTo) : "";
  const caret = frame >= marks.typeFrom - 8 && frame < marks.sendAt && blink(frame);
  const sendScale = press(frame, marks.sendAt);
  const openedAt = (() => {
    for (let i = active; i >= 0; i -= 1) {
      if (turns[i].artifact) return i;
    }
    return -1;
  })();
  const artifactOpen = openedAt >= 0 && (openedAt < active || frame >= marksForScroll.artifactAt - 6);
  const artifact = artifactOpen ? turns[openedAt].artifact : undefined;

  const composer = (
    <Composer typed={typed} cursor={caret} sendScale={sendScale} disclaimer />
  );

  const emptyState = active === 0 && frame < marks.userAt;

  const thread = (
    <div
      ref={listRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        transform: `translateY(${-scrollY}px)`,
      }}
    >
      {turns.slice(0, active).map((prior, i) => (
        <div key={i} ref={i === active - 1 ? prevAnchorRef : undefined}>
          <ChatTurnBlock turn={prior} marks={turnMarks(prior)} frozen />
        </div>
      ))}
      <div ref={anchorRef}>
        <ChatTurnBlock turn={turn} marks={marks} frozen={false} />
      </div>
    </div>
  );

  if (artifact) {
    return (
      <RyzeApp workspace={workspace} page="Chat" nav="New chat" stretch>
        <ArtifactShell
          chatTitle={title}
          name={artifact.name}
          site={isSiteArtifact(artifact)}
          progress={openedAt === active ? artifactProgress : 1}
          chatClassName="chat-conv"
          composer={composer}
          chat={thread}
        >
          <ArtifactPanelBody artifact={artifact} />
        </ArtifactShell>
      </RyzeApp>
    );
  }

  if (chrome === "bare") {
    return (
      <div className="chat-bare">
        <div className="chat-bare-thread" ref={listRef} style={{ transform: `translateY(${-scrollY}px)` }}>
          {turns.slice(0, active).map((prior, i) => (
            <div key={i} ref={i === active - 1 ? prevAnchorRef : undefined}>
              <ChatTurnBlock turn={prior} marks={turnMarks(prior)} frozen />
            </div>
          ))}
          <div ref={anchorRef}>
            <ChatTurnBlock turn={turn} marks={marks} frozen={false} />
          </div>
        </div>
        {frame < marks.userAt ? (
          <div className="chat-bare-composer" style={{ marginTop: 28 }}>
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={sendScale}
              approval="Skip"
              flatRing
            />
            {menu}
          </div>
        ) : null}
      </div>
    );
  }

  if (emptyState) {
    return (
      <RyzeApp workspace={workspace} page="Chat" nav="New chat" stretch>
        <ChatEmptyStage
          composer={
            <Composer typed={typed} cursor={caret} sendScale={sendScale} approval="Skip" flatRing />
          }
        />
      </RyzeApp>
    );
  }

  return (
    <RyzeApp workspace={workspace} page="Chat" nav="New chat" stretch>
      <ChatPage title={title} composer={composer} className="chat-conv">
        {thread}
      </ChatPage>
    </RyzeApp>
  );
};
