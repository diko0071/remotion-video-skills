import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PHONE_FOCUS, pushCamera, T } from "./timeline";

export const PushCamera: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const cam = f >= T.push ? pushCamera(f) : null;
  return (
    <AbsoluteFill
      style={
        cam
          ? {
              transformOrigin: `${PHONE_FOCUS.x}px ${PHONE_FOCUS.y}px`,
              transform: `translate(${cam.dx}px, ${cam.dy}px) scale(${cam.scale})`,
            }
          : undefined
      }
    >
      {children}
    </AbsoluteFill>
  );
};
