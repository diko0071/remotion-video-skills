import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../core/press-context";
import "./writing-articles.css";

const SLASH_ITEMS = [
  "Heading 2",
  "Heading 3",
  "Bullet list",
  "Numbered list",
  "Table",
  "TL;DR block",
  "Stats block",
  "FAQ block",
  "Quote block",
  "Products block",
  "CTA block",
] as const;

export const SlashMenu: React.FC<{
  visible: boolean;
  clickable: "Products block" | "FAQ block";
}> = ({ visible, clickable }) => {
  const scale = useClickPress(`slash.${clickable}`);
  if (!visible) return null;
  return (
    <div className="wa-slash">
      {SLASH_ITEMS.map((item) => (
        <span
          key={item}
          className="wa-slash-item"
          {...(item === clickable
            ? { "data-click": `slash.${clickable}`, style: { scale: String(scale) } }
            : {})}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export type BlockProduct = { name: string; price: string; img: string };

export const ProductsBlockCard: React.FC<{
  products: BlockProduct[];
  style?: React.CSSProperties;
}> = ({ products, style }) => {
  const scale = useClickPress("block.products.search");
  return (
    <div className="wa-block" style={style}>
      <div className="wa-block-head">Products block</div>
      {products.length ? (
        <div className="wa-block-products">
          {products.map((p) => (
            <div key={p.name} className="wa-bp">
              <span className="wa-bp-img">
                <Img src={staticFile(p.img)} />
              </span>
              <span className="wa-bp-name">{p.name}</span>
              <span className="wa-bp-price">{p.price}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="wa-block-empty">Heading (optional)</div>
      )}
      <div className="wa-block-foot">
        <span className="btn-outline btn-sm">Add product</span>
        <span
          className="btn-outline btn-sm"
          data-click="block.products.search"
          style={{ scale: String(scale) }}
        >
          Search products
        </span>
      </div>
    </div>
  );
};

export const ProductSearchDialog: React.FC<{
  visible: boolean;
  query: string;
  picked: number;
  products: BlockProduct[];
}> = ({ visible, query, picked, products }) => {
  const addScale = useClickPress("dlg.products.add");
  const rowScale = useClickPress("dlg.products.row1");
  if (!visible) return null;
  return (
    <div className="wa-dim">
      <div className="wa-dialog">
        <div className="wa-dialog-title">Add products</div>
        <div className="wa-dialog-desc">
          Search your store and pick up to 4 products for this block.
        </div>
        <div className={`wa-dialog-input${query ? "" : " empty"}`}>
          {query || "Search products…"}
          {query ? <span className="wa-caret" /> : null}
        </div>
        <div className="wa-dialog-rows">
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`wa-dr${i < picked ? " on" : ""}`}
              {...(i === 0
                ? { "data-click": "dlg.products.row1", style: { scale: String(rowScale) } }
                : i === 1
                  ? { "data-click": "dlg.products.row2" }
                  : {})}
            >
              <span className="wa-dr-check" />
              <span className="wa-bp-img">
                <Img src={staticFile(p.img)} />
              </span>
              <span className="wa-bp-name">{p.name}</span>
              <span className="wa-bp-price">{p.price}</span>
            </div>
          ))}
        </div>
        <div className="wa-dialog-foot">
          <span className="btn-outline btn-sm">Cancel</span>
          <span
            className="btn-primary btn-sm"
            data-click="dlg.products.add"
            style={{ scale: String(addScale), opacity: picked ? 1 : 0.5 }}
          >
            Add {picked || ""} product{picked === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const FaqBlockCard: React.FC<{
  question: string;
  answer: string;
  typingAnswer?: boolean;
  style?: React.CSSProperties;
}> = ({ question, answer, typingAnswer, style }) => (
  <div className="wa-block" style={style}>
    <div className="wa-block-head">FAQ block</div>
    <div className="wa-faq-row">
      <div className={`wa-dialog-input${question ? "" : " empty"}`}>
        {question || "Question?"}
      </div>
      <div className={`wa-dialog-input tall${answer ? "" : " empty"}`}>
        {answer || "Answer in one or two sentences"}
        {typingAnswer ? <span className="wa-caret" /> : null}
      </div>
    </div>
    <div className="wa-block-foot">
      <span className="btn-outline btn-sm">Add question</span>
    </div>
  </div>
);

export const RegenDialog: React.FC<{
  visible: boolean;
  typed: string;
}> = ({ visible, typed }) => {
  const scale = useClickPress("dlg.regen.generate");
  if (!visible) return null;
  return (
    <div className="wa-dim">
      <div className="wa-dialog">
        <div className="wa-dialog-title">Regenerate image</div>
        <div className="wa-dialog-desc">
          Describe what should change — the AI reworks the current image following your direction.
        </div>
        <div className={`wa-dialog-input tall${typed ? "" : " empty"}`}>
          {typed || "Darker tones, product shown outdoors, no people…"}
          {typed ? <span className="wa-caret" /> : null}
        </div>
        <div className="wa-dialog-foot">
          <span className="btn-outline btn-sm">Cancel</span>
          <span
            className="btn-primary btn-sm"
            data-click="dlg.regen.generate"
            style={{ scale: String(scale), opacity: typed ? 1 : 0.5 }}
          >
            Generate
          </span>
        </div>
      </div>
    </div>
  );
};

export const RefsDialog: React.FC<{
  visible: boolean;
  uploaded: number;
  refs: string[];
}> = ({ visible, uploaded, refs }) => {
  const upScale = useClickPress("dlg.refs.upload");
  const saveScale = useClickPress("dlg.refs.save");
  if (!visible) return null;
  return (
    <div className="wa-dim">
      <div className="wa-dialog">
        <div className="wa-dialog-title">Edit blog image references</div>
        <div className="wa-dialog-desc">Reference photos used when generating blog images.</div>
        <div className="wa-refs-grid">
          {refs.slice(0, uploaded).map((r) => (
            <span key={r} className="wa-ref">
              <Img src={staticFile(r)} />
            </span>
          ))}
          {uploaded === 0 ? <div className="wa-refs-empty">No reference images yet.</div> : null}
        </div>
        <div className="wa-dialog-foot spread">
          <span
            className="btn-outline btn-sm"
            data-click="dlg.refs.upload"
            style={{ scale: String(upScale) }}
          >
            Upload image
          </span>
          <span style={{ display: "flex", gap: 8 }}>
            <span className="btn-outline btn-sm">Cancel</span>
            <span
              className="btn-primary btn-sm"
              data-click="dlg.refs.save"
              style={{ scale: String(saveScale) }}
            >
              Save
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
