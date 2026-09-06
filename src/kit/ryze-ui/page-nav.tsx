import React from "react";

const cx = (...parts: (string | undefined | false)[]) => parts.filter(Boolean).join(" ");

export const PageNav: React.FC<{
  className: string;
  itemClassName: string;
  activeClassName?: string;
  pages: string[];
  current?: string;
  prev?: React.ReactNode;
  next?: React.ReactNode;
  prevClassName?: string;
  nextClassName?: string;
  modifier?: (page: string) => string | undefined;
  style?: React.CSSProperties;
}> = ({
  className,
  itemClassName,
  activeClassName = "on",
  pages,
  current,
  prev,
  next,
  prevClassName,
  nextClassName,
  modifier,
  style,
}) => (
  <div className={className} style={style}>
    {prev === undefined ? null : (
      <span className={prevClassName ?? itemClassName}>{prev}</span>
    )}
    {pages.map((page) => (
      <span
        key={page}
        className={cx(itemClassName, page === current && activeClassName, modifier?.(page))}
      >
        {page}
      </span>
    ))}
    {next === undefined ? null : (
      <span className={nextClassName ?? itemClassName}>{next}</span>
    )}
  </div>
);
