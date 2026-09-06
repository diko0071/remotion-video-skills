import React from "react";
import { Img, staticFile } from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/SourceSerif4";

const { fontFamily: serif } = loadSerif();

const Caret: React.FC<{ on: boolean; color?: string }> = ({ on, color = "#171310" }) => (
  <span
    style={{
      display: "inline-block",
      width: 2.5,
      height: "1.1em",
      background: on ? color : "transparent",
      verticalAlign: "text-bottom",
      marginLeft: 3,
    }}
  />
);

export type PaneProps = {
  typed: string;
  caret: boolean;
  question?: string;
  answer?: React.ReactNode;
  sendScale?: number;
};

const Header: React.FC<{ logo: string; name: string; dark?: boolean; font?: string }> = ({
  logo,
  name,
  dark,
  font,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "26px 38px",
      flexShrink: 0,
    }}
  >
    <Img src={staticFile(logo)} style={{ width: 36, height: 36 }} />
    <span
      style={{
        fontSize: 27,
        fontWeight: 700,
        color: dark ? "#E8E8E6" : "#0D0D0D",
        fontFamily: font,
      }}
    >
      {name}
    </span>
  </div>
);

const QaThread: React.FC<{ question: string; dark?: boolean; children?: React.ReactNode }> = ({
  question,
  dark,
  children,
}) => (
  <div
    style={{
      width: 1480,
      margin: "30px auto 0",
      display: "flex",
      flexDirection: "column",
      gap: 44,
    }}
  >
    <div
      style={{
        alignSelf: "flex-end",
        background: dark ? "#2A2C2C" : "#F1F1F1",
        color: dark ? "#E8E8E6" : "#26251F",
        borderRadius: 20,
        padding: "18px 28px",
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      {question}
    </div>
    <div
      style={{
        fontSize: 36,
        lineHeight: 1.65,
        color: dark ? "rgba(255,255,255,0.92)" : "#26251F",
        maxWidth: 1280,
      }}
    >
      {children}
    </div>
  </div>
);

const Shell: React.FC<{
  bg: string;
  logo: string;
  name: string;
  dark?: boolean;
  headerFont?: string;
  question?: string;
  answer?: React.ReactNode;
  welcome: React.ReactNode;
  input: React.ReactNode;
}> = ({ bg, logo, name, dark, headerFont, question, answer, welcome, input }) => (
  <div
    style={{
      width: 1920,
      height: 1080,
      background: bg,
      fontFamily: "'Plus Jakarta Sans'",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Header logo={logo} name={name} dark={dark} font={headerFont} />
    {question ? (
      <QaThread question={question} dark={dark}>
        {answer}
      </QaThread>
    ) : (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          padding: "0 200px",
        }}
      >
        {welcome}
        {input}
      </div>
    )}
  </div>
);

export const ChatgptPane: React.FC<PaneProps> = ({ typed, caret, question, answer, sendScale = 1 }) => (
  <Shell
    bg="#FFFFFF"
    logo="ai/chatgpt.png"
    name="ChatGPT"
    question={question}
    answer={answer}
    welcome={
      <div style={{ fontSize: 44, fontWeight: 600, color: "#0D0D0D" }}>What can I help with?</div>
    }
    input={
      <div
        data-click="gpt.input"
        style={{
          width: 900,
          background: "#F4F4F4",
          borderRadius: 999,
          padding: "24px 34px",
          fontSize: 28,
          color: typed ? "#0D0D0D" : "#8E8EA0",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 30, color: "#8E8EA0" }}>+</span>
        <span style={{ flex: 1 }}>
          {typed || "Ask anything"}
          <Caret on={caret} color="#0D0D0D" />
        </span>
        <span
          data-click="gpt.send"
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: typed ? "#0D0D0D" : "#D7D7D7",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
            transform: `scale(${sendScale})`,
          }}
        >
          {"\u2191"}
        </span>
      </div>
    }
  />
);

export const ClaudePane: React.FC<PaneProps> = ({ typed, caret, question, answer }) => (
  <Shell
    bg="#FAF9F5"
    logo="ai/claude.png"
    name="Claude"
    headerFont={serif}
    question={question}
    answer={answer}
    welcome={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontFamily: serif,
          fontSize: 48,
          color: "#141413",
        }}
      >
        How can I help you today?
      </div>
    }
    input={
      <div
        style={{
          width: 940,
          background: "#FFFFFF",
          border: "1px solid rgba(20,20,19,0.12)",
          borderRadius: 18,
          boxShadow: "0 4px 18px rgba(20,20,19,0.05)",
          padding: "26px 30px",
          fontSize: 28,
          color: typed ? "#141413" : "#9C9A93",
        }}
      >
        {typed || "How can Claude help you today?"}
        <Caret on={caret} color="#C15F3C" />
      </div>
    }
  />
);

export const PerplexityPane: React.FC<PaneProps> = ({ typed, caret, question, answer }) => (
  <Shell
    bg="#191A1A"
    logo="ai/perplexity.webp"
    name="perplexity"
    dark
    question={question}
    answer={answer}
    welcome={
      <span style={{ fontSize: 46, fontWeight: 500, color: "#E8E8E6" }}>
        Where knowledge begins
      </span>
    }
    input={
      <div
        style={{
          width: 940,
          background: "#202222",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 16,
          padding: "26px 30px",
          fontSize: 28,
          color: typed ? "#E8E8E6" : "#7D8080",
        }}
      >
        {typed || "Ask anything..."}
        <Caret on={caret} color="#20B8CD" />
      </div>
    }
  />
);

export const GeminiPane: React.FC<PaneProps> = ({ typed, caret, question, answer }) => (
  <Shell
    bg="#FFFFFF"
    logo="ai/gemini.png"
    name="Gemini"
    question={question}
    answer={answer}
    welcome={
      <span
        style={{
          fontSize: 46,
          fontWeight: 600,
          background: "linear-gradient(90deg, #4285F4, #9B72CB, #D96570)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Hello, how can I help?
      </span>
    }
    input={
      <div
        style={{
          width: 940,
          background: "#F0F4F9",
          borderRadius: 999,
          padding: "26px 34px",
          fontSize: 28,
          color: typed ? "#1F1F1F" : "#5F6368",
        }}
      >
        {typed || "Ask Gemini"}
        <Caret on={caret} color="#4285F4" />
      </div>
    }
  />
);
