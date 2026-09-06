import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./article-editor.css";

export const SaveButton: React.FC<{ saving?: boolean; label: string }> = ({ label }) => {
  const scale = useClickPress("article.save");
  return (
    <span
      className="btn-primary btn-block"
      data-click="article.save"
      style={{ scale: String(scale) }}
    >
      {label}
    </span>
  );
};
