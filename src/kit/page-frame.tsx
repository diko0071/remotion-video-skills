import React, { useMemo } from "react";
import { Thumbnail } from "@remotion/player";

export const PageFrame: React.FC<{
  height: number;
  width?: number;
  children: React.ReactNode;
}> = ({ height, width = 1920, children }) => {
  const Component = useMemo(() => {
    const Inner: React.FC = () => <>{children}</>;
    return Inner;
  }, [children]);
  return (
    <Thumbnail
      component={Component}
      compositionWidth={width}
      compositionHeight={height}
      frameToDisplay={100000}
      durationInFrames={100002}
      fps={30}
      style={{ width: "100%" }}
    />
  );
};
