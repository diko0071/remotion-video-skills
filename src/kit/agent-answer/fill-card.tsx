import React from "react";
import { FillShell, FillShellProps } from "./fill-shell";

export const FillCard: React.FC<FillShellProps> = ({ len = 10, rise = 16, ...rest }) => <FillShell len={len} rise={rise} {...rest} />;
