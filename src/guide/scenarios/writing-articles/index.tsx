import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { ArticleBody, ArticleEditorBody } from "../../../kit/ryze-ui/pages/article-editor";
import { ARTICLE_EDITOR_BODY } from "../../../kit/ryze-ui/pages/article-editor/data";
import { ArticlePreviewBody } from "../../../kit/ryze-ui/pages/article-preview";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { useGuideScroll } from "../../scroll";
import { Composer } from "../../../kit/ryze-ui/composer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { ACTS } from "./acts";
import { AGENT_PROMPT, EditPanelThread } from "./agent-chat";
import { ContentSettingsBody } from "./content-settings";
import {
  FaqBlockCard,
  ProductSearchDialog,
  ProductsBlockCard,
  RefsDialog,
  RegenDialog,
  SlashMenu,
  type BlockProduct,
} from "./editor-extras";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const EDIT_AT = timeline.at("edit");
const REGEN_DLG_AT = timeline.at("regenDlg");
const REGEN_TYPING_AT = timeline.at("regenTyping");
const REGEN_DONE_AT = timeline.at("regenDone");
const SLASH_AT = timeline.at("slashOpen");
const PRODUCTS_BLOCK_AT = timeline.at("productsBlock");
const SEARCH_DLG_AT = timeline.at("searchDlg");
const PICKED1_AT = timeline.at("picked1");
const PICKED2_AT = timeline.at("picked2");
const PRODUCTS_ADDED_AT = timeline.at("productsAdded");
const SLASH2_AT = timeline.at("slash2Open");
const FAQ_BLOCK_AT = timeline.at("faqBlock");
const FAQ_TYPING_AT = timeline.at("faqTyping");
const AGENT_PANEL_AT = timeline.at("agentPanel");
const AGENT_TYPING_AT = timeline.at("agentTyping");
const AGENT_SEND_AT = timeline.at("agentSend");
const AGENT_DONE_AT = timeline.at("agentSend") + 230;
const PANEL_CLOSED_AT = timeline.at("panelClosed");
const SETTINGS_AT = timeline.at("settings");
const TONE_TYPING_AT = timeline.at("toneTyping");
const INSTR_TYPING_AT = timeline.at("instrTyping");
const STYLE_SKETCH_AT = timeline.at("styleSketch");
const REFS_DLG_AT = timeline.at("refsDlg");
const UPLOAD1_AT = timeline.at("upload1");
const UPLOAD2_AT = timeline.at("upload2");
const REFS_SAVED_AT = timeline.at("refsSaved");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_WRITING_ARTICLES_TOTAL = OUTRO_AT + 110;

const REGEN_HINT = "Darker tones, product shown outdoors";
const TONE_TEXT = "Confident and practical, like a maker talking shop. No fluff.";
const INSTR_TEXT = "Always mention burn time in product comparisons. Never promise health benefits.";
const FAQ_QUESTION = "Do you ship candles internationally?";
const FAQ_ANSWER = "Yes — we ship worldwide from Portland, and orders over $60 ship free.";

const STORE_PRODUCTS: BlockProduct[] = [
  { name: "Cedar Smoke 3-Wick", price: "$42", img: "product-1.jpg" },
  { name: "Vetiver Ember Travel Tin", price: "$24", img: "product-2.jpg" },
  { name: "Autumn Amber Classic Jar", price: "$34", img: "product-3.jpg" },
];

const REF_IMAGES = ["hero-candles.jpg", "banner-candles.jpg", "product-3.jpg"];

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const editorScroll = useGuideScroll(timeline.scrolls, { from: EDIT_AT, until: SETTINGS_AT });
  const panelProgress = usePanelSlide([{ open: AGENT_PANEL_AT, close: PANEL_CLOSED_AT }]);
  const settingsScroll = useGuideScroll(timeline.scrolls, { from: SETTINGS_AT });

  const onP1 = frame < EDIT_AT;
  const onE1 = frame >= EDIT_AT && frame < SETTINGS_AT;
  const onS1 = frame >= SETTINGS_AT;
  const nav = onS1 ? "Settings" : "Content Plan";

  const regenTyped = typing(frame, REGEN_HINT, REGEN_TYPING_AT, REGEN_DONE_AT - 12);
  const toneTyped = typing(frame, TONE_TEXT, TONE_TYPING_AT, TONE_TYPING_AT + 60);
  const instrTyped = typing(frame, INSTR_TEXT, INSTR_TYPING_AT, INSTR_TYPING_AT + 80);
  const faqAnswerTyped = typing(frame, FAQ_ANSWER, FAQ_TYPING_AT, FAQ_TYPING_AT + 70);
  const agentTyped = typing(frame, AGENT_PROMPT, AGENT_TYPING_AT + 6, AGENT_SEND_AT - 14);
  const agentTypingLive = frame >= AGENT_TYPING_AT && frame < AGENT_SEND_AT;

  const picked = frame >= PICKED2_AT ? 2 : frame >= PICKED1_AT ? 1 : 0;
  const uploaded = frame >= UPLOAD2_AT + 8 ? 3 : frame >= UPLOAD2_AT ? 2 : frame >= UPLOAD1_AT ? 1 : 0;

  const slash1 = frame >= SLASH_AT && frame < PRODUCTS_BLOCK_AT;
  const slash2 = frame >= SLASH2_AT && frame < FAQ_BLOCK_AT;

  const editorExtras = (
    <>
      {slash1 ? (
        <div style={{ position: "relative" }}>
          <p className="ae-body-p">
            /<span className="wa-caret" />
          </p>
          <SlashMenu visible clickable="Products block" />
        </div>
      ) : null}
      {frame >= PRODUCTS_BLOCK_AT ? (
        <ProductsBlockCard
          products={frame >= PRODUCTS_ADDED_AT ? STORE_PRODUCTS.slice(0, 2) : []}
        />
      ) : null}
      <ArticleBody blocks={ARTICLE_EDITOR_BODY.slice(3, 5)} />
      {slash2 ? (
        <div style={{ position: "relative" }}>
          <p className="ae-body-p">
            /<span className="wa-caret" />
          </p>
          <SlashMenu visible clickable="FAQ block" />
        </div>
      ) : null}
      {frame >= FAQ_BLOCK_AT ? (
        <FaqBlockCard
          question={frame >= FAQ_TYPING_AT ? FAQ_QUESTION : ""}
          answer={faqAnswerTyped}
          typingAnswer={frame >= FAQ_TYPING_AT && frame < FAQ_TYPING_AT + 74}
        />
      ) : null}
      <ArticleBody blocks={ARTICLE_EDITOR_BODY.slice(5)} />
    </>
  );

  const bodyHead =
    frame >= AGENT_DONE_AT
      ? [
          {
            kind: "p" as const,
            text: "A tunnelled candle strands up to a third of the wax you paid for. The flame sinks below a hardened ring, the scent fades, and the jar is done long before the wax is. Here is why it happens — and how one long burn fixes it.",
          },
          ...ARTICLE_EDITOR_BODY.slice(1, 3),
        ]
      : ARTICLE_EDITOR_BODY.slice(0, 3);

  return (
    <ShellOverrideProvider value={{ expanded: true, nav, section: "seo" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page={nav}
          nav={nav}
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title="Edit this article"
              composer={
                <Composer
                  placeholder="Message Agent…"
                  fill
                  typed={frame < AGENT_SEND_AT ? agentTyped : ""}
                  cursor={agentTypingLive}
                />
              }
            >
              <EditPanelThread from={AGENT_SEND_AT + 2} />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onP1} scope="p1">
              <ArticlePreviewBody />
            </PageLayer>
            <PageLayer visible={onE1} scope="e1">
              <ArticleEditorBody
                scrollPx={editorScroll}
                imageSrc={frame >= REGEN_DONE_AT + 20 ? "banner-candles.jpg" : undefined}
                bodyBlocks={bodyHead}
                afterBody={editorExtras}
              />
            </PageLayer>
            <PageLayer visible={onS1} scope="s1">
              <ContentSettingsBody
                scrollPx={settingsScroll}
                writing={{
                  toneTyped:
                    frame >= TONE_TYPING_AT && frame < INSTR_TYPING_AT ? toneTyped : undefined,
                  tone: frame >= INSTR_TYPING_AT ? TONE_TEXT : undefined,
                  instructionsTyped:
                    frame >= INSTR_TYPING_AT && frame < INSTR_TYPING_AT + 84
                      ? instrTyped
                      : undefined,
                  instructions: frame >= INSTR_TYPING_AT + 84 ? INSTR_TEXT : undefined,
                  examplesLabel: "2 examples",
                }}
                visuals={{
                  active:
                    frame >= REFS_SAVED_AT + 6
                      ? "custom"
                      : frame >= STYLE_SKETCH_AT + 6
                        ? "sketch"
                        : "photo",
                  customThumb: frame >= REFS_SAVED_AT + 6 ? REF_IMAGES[0] : undefined,
                }}
              />
            </PageLayer>
            <RegenDialog
              visible={frame >= REGEN_DLG_AT && frame < REGEN_DONE_AT + 4}
              typed={regenTyped}
            />
            <ProductSearchDialog
              visible={frame >= SEARCH_DLG_AT && frame < PRODUCTS_ADDED_AT + 4}
              query="candle"
              picked={picked}
              products={STORE_PRODUCTS}
            />
            <RefsDialog
              visible={frame >= REFS_DLG_AT && frame < REFS_SAVED_AT + 4}
              uploaded={uploaded}
              refs={REF_IMAGES}
            />
          </div>
        </RyzeApp>
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideWritingArticles: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-writing-articles"
    title={{ title: "Make every article yours", accent: "yours" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);
