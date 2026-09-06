import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/ryze-base.css";
import "../src/kit/ryze-ui/screens.css";
import { PAGES } from "../src/scenarios/pages";

const usePageRoute = () => {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const m = hash.match(/^#\/([\w-]+)\/([\w-]+)$/);
  return m ? PAGES.find((p) => p.scenario === m[1] && p.slug === m[2]) ?? null : null;
};

const App: React.FC = () => {
  const page = usePageRoute();
  if (page) {
    const PageComponent = page.Component;
    return (
      <div
        style={{
          position: "relative",
          width: 1920,
          minHeight: 1080,
          height: 1080,
          overflow: "hidden",
          background: "#FDFAF3",
        }}
      >
        <PageComponent />
      </div>
    );
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#171310",
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#C19767"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" /></svg>
        <span style={{ color: "#F5EFE4", fontWeight: 800, fontSize: 22 }}>ryze pages</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PAGES.map((p) => (
          <a
            key={p.scenario + p.slug}
            href={`#/${p.scenario}/${p.slug}`}
            style={{
              background: "rgba(245,239,228,0.06)",
              border: "1px solid rgba(245,239,228,0.12)",
              borderRadius: 6,
              padding: "16px 26px",
              minWidth: 380,
              color: "#F5EFE4",
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            {p.title}
            <span style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(245,239,228,0.45)", marginTop: 3 }}>
              /{p.scenario}/{p.slug}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
