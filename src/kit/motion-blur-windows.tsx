import React from "react";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { useCurrentFrame } from "remotion";

export const MotionBlurWindows: React.FC<{
  windows: Array<[number, number]>;
  shutterAngle?: number;
  samples?: number;
  children: React.ReactNode;
}> = ({ windows, shutterAngle = 180, samples = 6, children }) => {
  const f = useCurrentFrame();
  const on = windows.some(([a, b]) => f >= a && f <= b);
  if (!on) return <>{children}</>;
  return (
    <CameraMotionBlur shutterAngle={shutterAngle} samples={samples}>
      {children}
    </CameraMotionBlur>
  );
};
