import React, { createContext, useContext } from "react";

export type SceneStyle = {
  textScale: number;
  lineWidth: number;
};

const DEFAULT_STYLE: SceneStyle = { textScale: 1, lineWidth: 5 };

const SceneStyleContext = createContext<SceneStyle>(DEFAULT_STYLE);

export const SceneStyleProvider: React.FC<{ value: Partial<SceneStyle>; children: React.ReactNode }> = ({
  value,
  children,
}) => (
  <SceneStyleContext.Provider value={{ ...DEFAULT_STYLE, ...value }}>{children}</SceneStyleContext.Provider>
);

export const useSceneStyle = () => useContext(SceneStyleContext);

export const useFs = () => {
  const { textScale } = useSceneStyle();
  return (base: number) => Math.round(base * textScale);
};
