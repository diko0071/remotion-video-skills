import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { PALETTE, SHOTS, TOTAL } from "./timings";
import { PageCurl } from "./page-curl";
import { TypeInShot } from "./scenes/type-in";
import { AppWorkShot } from "./scenes/app-work";
import { MoneyBloomShot } from "./scenes/money-bloom";
import { AdArrivesShot, AdHoldShot, WideSessionShot } from "./scenes/ad-arrives";
import { PhoneShot } from "./scenes/phone";
import { KineticShot } from "./scenes/kinetic";
import {
  EndcardShot,
  SettingsCascadeShot,
  SettingsMacroShot,
  SettingsWideShot,
} from "./scenes/toggles";
import { HiggsfieldSite } from "./ui/site";
import { Camera } from "./camera";

const CurlToSite: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <PageCurl
      progress={p}
      front={<AdHoldShot />}
      back={
        <Camera keys={[{ frame: 0, zoom: 1.04 }, { frame: 8, zoom: 1.0 }]}>
          <div style={{ width: 1920, height: 1080 }}>
            <HiggsfieldSite />
          </div>
        </Camera>
      }
    />
  );
};

const SiteStill: React.FC = () => (
  <AbsoluteFill>
    <Camera keys={[{ frame: 0, zoom: 1.0 }, { frame: 30, zoom: 1.05 }]}>
      <div style={{ width: 1920, height: 1080 }}>
        <HiggsfieldSite />
      </div>
    </Camera>
  </AbsoluteFill>
);

const CurlToPhone: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <PageCurl
      progress={p}
      front={
        <Camera keys={[{ frame: 0, zoom: 1.05 }]}>
          <div style={{ width: 1920, height: 1080 }}>
            <HiggsfieldSite />
          </div>
        </Camera>
      }
      back={<PhoneShot amountAt={999} />}
    />
  );
};

export const ShipperAdwait: React.FC = () => (
  <AbsoluteFill style={{ background: PALETTE.black }}>
    <Sequence from={SHOTS.typeIn.from} durationInFrames={SHOTS.typeIn.duration}>
      <TypeInShot />
    </Sequence>
    <Sequence from={SHOTS.appWork.from} durationInFrames={SHOTS.appWork.duration}>
      <AppWorkShot />
    </Sequence>
    <Sequence from={SHOTS.moneyBloom.from} durationInFrames={SHOTS.moneyBloom.duration}>
      <MoneyBloomShot />
    </Sequence>
    <Sequence from={SHOTS.wideSession.from} durationInFrames={SHOTS.wideSession.duration}>
      <WideSessionShot />
    </Sequence>
    <Sequence from={SHOTS.adArrives.from} durationInFrames={SHOTS.adArrives.duration}>
      <AdArrivesShot />
    </Sequence>
    <Sequence from={SHOTS.adHold.from} durationInFrames={SHOTS.adHold.duration}>
      <AdHoldShot />
    </Sequence>
    <Sequence from={SHOTS.curlToSite.from} durationInFrames={SHOTS.curlToSite.duration}>
      <CurlToSite />
    </Sequence>
    <Sequence from={SHOTS.siteFull.from} durationInFrames={SHOTS.siteFull.duration}>
      <SiteStill />
    </Sequence>
    <Sequence from={SHOTS.curlToPhone.from} durationInFrames={SHOTS.curlToPhone.duration}>
      <CurlToPhone />
    </Sequence>
    <Sequence from={SHOTS.phone.from} durationInFrames={SHOTS.phone.duration}>
      <PhoneShot amountAt={26} />
    </Sequence>
    <Sequence from={SHOTS.kinetic.from} durationInFrames={SHOTS.kinetic.duration}>
      <KineticShot />
    </Sequence>
    <Sequence from={SHOTS.settingsWide.from} durationInFrames={SHOTS.settingsWide.duration}>
      <SettingsWideShot />
    </Sequence>
    <Sequence from={SHOTS.settingsMacro.from} durationInFrames={SHOTS.settingsMacro.duration}>
      <SettingsMacroShot />
    </Sequence>
    <Sequence from={SHOTS.settingsCascade.from} durationInFrames={SHOTS.settingsCascade.duration}>
      <SettingsCascadeShot />
    </Sequence>
    <Sequence from={SHOTS.endcard.from} durationInFrames={SHOTS.endcard.duration}>
      <EndcardShot />
    </Sequence>
  </AbsoluteFill>
);

export const SHIPPER_ADWAIT_TOTAL = TOTAL;
