import React from "react";
import { Lockup } from "../../kit/lockup";
import { MuseAvatar } from "../../kit/muse-ui";
import { GROUND } from "./timings";

export const TailScene: React.FC = () => (
  <Lockup mark="ryze-sun.png" word="Ryze AI" background={GROUND} ink="#171310" partnerNode={<MuseAvatar size={140} mood="working" />} tagline="Your marketing team, now in Muse" />
);
