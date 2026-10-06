import React from "react";
import { UrlEndcard } from "../../kit/url-endcard";
import { SANS } from "./font";
import { CORAL, TAIL } from "./timings";

export const TailScene: React.FC = () => <UrlEndcard t={TAIL} title="Ryze." line={["Now", " in the", " Claude", " Directory."]} url={TAIL.url} fontFamily={SANS} accent={CORAL} />;
