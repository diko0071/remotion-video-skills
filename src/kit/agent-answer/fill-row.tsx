import React from "react";
import { FillShell, FillShellProps } from "./fill-shell";

export const FillRow: React.FC<FillShellProps> = ({ len = 8, rise = 12, ...rest }) => <FillShell len={len} rise={rise} {...rest} />;
