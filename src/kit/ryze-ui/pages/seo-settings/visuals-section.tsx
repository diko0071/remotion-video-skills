import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import { ImagePlusIcon, PencilIcon } from "../../icons";
import "../../pages.css";
import "./seo-settings.css";
import { SectionRow, SettingsSection } from "./settings-section";

const STYLE_PRESETS = [
  { key: "photo", label: "Photo Realistic", desc: "High-quality, lifelike images", thumb: "image-styles/photo.png" },
  { key: "illustration", label: "Illustration", desc: "Flat vector scenes in your brand colors", thumb: "image-styles/illustration.png" },
  { key: "sketch", label: "Sketch", desc: "Hand-drawn, artistic style", thumb: "image-styles/sketch.png" },
  { key: "watercolor", label: "Watercolor", desc: "Soft painted textures", thumb: "image-styles/watercolor.png" },
] as const;

const StyleTile: React.FC<{
  id: string;
  label: string;
  desc: string;
  thumb?: string;
  active: boolean;
  edit?: boolean;
}> = ({ id, label, desc, thumb, active, edit }) => {
  const scale = useClickPress(id);
  return (
    <div className={`st-style${active ? " on" : ""}`} data-click={id} style={{ scale: String(scale) }}>
      <div className={`st-style-thumb${thumb ? "" : " placeholder"}`}>
        {thumb ? <Img src={staticFile(thumb)} /> : <ImagePlusIcon />}
        {edit ? (
          <span className="st-style-edit" data-click="st.style.edit">
            <PencilIcon />
          </span>
        ) : null}
      </div>
      <div className="st-style-body">
        <span className="st-style-label">{label}</span>
        <span className="st-style-desc">{desc}</span>
      </div>
    </div>
  );
};

export const VisualsSection: React.FC<{
  active?: string;
  customThumb?: string;
}> = ({ active = "photo", customThumb }) => (
  <SettingsSection title="Visuals" hint="How generated images should look.">
    <SectionRow
      label="Image style"
      hint="How generated images should look."
      stacked
      control={
        <div className="st-styles">
          {STYLE_PRESETS.map((p) => (
            <StyleTile
              key={p.key}
              id={`st.style.${p.key}`}
              label={p.label}
              desc={p.desc}
              thumb={p.thumb}
              active={active === p.key}
            />
          ))}
          <StyleTile
            id="st.style.custom"
            label="Your style"
            desc="Uses the image examples you upload"
            thumb={customThumb}
            active={active === "custom"}
            edit
          />
        </div>
      }
    />
  </SettingsSection>
);
