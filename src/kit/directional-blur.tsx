import React from "react";

export const WHITE_FILTER = "url(#kit-white)";
export const CREAM_FILTER = "url(#kit-cream)";

export const FilterDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
    <defs>
      <filter id="kit-white" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 3 0" />
      </filter>
      <filter id="kit-cream" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.98  0 0 0 0 0.94  0 0 0 0 0.86  0 0 0 3 0" />
      </filter>
    </defs>
  </svg>
);

export const DirectionalBlur: React.FC<{
  id: string;
  x?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ id, x = 0, y = 0, children, style }) => {
  const sx = Math.max(0, x).toFixed(2);
  const sy = Math.max(0, y).toFixed(2);
  const active = x > 0.3 || y > 0.3;
  return (
    <>
      {active ? (
        <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
          <filter id={id} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${sx} ${sy}`} />
          </filter>
        </svg>
      ) : null}
      <div style={{ ...style, filter: active ? `url(#${id})` : undefined }}>{children}</div>
    </>
  );
};
