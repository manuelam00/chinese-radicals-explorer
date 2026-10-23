import { useState, useRef, useEffect } from "react";
import { nameOf, dirOf, t } from "../i18n";

// How long the mouse must rest on the radical before the stroke-order animation appears (ms).
// Without a delay, just moving the mouse across the page would flash popups.
const HOVER_DELAY = 350;

const ERAS = [
  { key: "oracle", label: "Oracle" },
  { key: "bronze", label: "Bronze" },
  { key: "slip", label: "Slip" },
  { key: "ancient", label: "Ancient" },
  { key: "seal", label: "Seal" },
  { key: "liushutong", label: "LST" },
];

// One cell of the forms row. If the image can't load, it shows the dashed box instead.
function FormCell({ form, label, char }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="form" title={label}>
      {form && !broken ? (
        <img src={form.url} alt={`${char} ${label}`} onError={() => setBroken(true)} />
      ) : (
        <span className="empty" />
      )}
      <small>{label}</small>
    </div>
  );
}

// The row of six historical forms. Exported so the 好 box in "How to read" can reuse it.
//   forms – { oracle, bronze, slip, ancient, seal, liushutong }, each { url } or null
export function Forms({ forms, char }) {
  return (
    <div className="forms">
      {ERAS.map(({ key, label }) => (
        <FormCell key={key} form={forms[key]} label={label} char={char} />
      ))}
    </div>
  );
}

// One card. Props:
//   radical   – one object from radicals.json
//   lang      – "en" | "it" | "fr" | "ar"
//   highlight – optional: a derived character to circle (used in "How to read")
export default function RadicalCard({ radical, lang, highlight }) {
  // STATE: is the stroke-order popup visible on THIS card? Each card has its own copy.
  const [showStroke, setShowStroke] = useState(false);

  // REF: remembers the pending timer between renders WITHOUT causing a re-render.
  const timer = useRef(null);

  const stroke = radical.strokeImage; // { url, file, license, ... } or null

  const openSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowStroke(true), HOVER_DELAY);
  };
  const close = () => {
    clearTimeout(timer.current);
    setShowStroke(false);
  };

  // EFFECT with cleanup: if the card disappears (e.g. filtered out) while a timer
  // is pending, cancel it so React doesn't update a card that no longer exists.
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="card">
      <div
        className={stroke ? "char-wrap has-stroke" : "char-wrap"}
        onMouseEnter={stroke ? openSoon : undefined}
        onMouseLeave={stroke ? close : undefined}
        // Keyboard: Tab onto the radical shows it. Touch screens: tap toggles it.
        tabIndex={stroke ? 0 : undefined}
        onFocus={stroke ? () => setShowStroke(true) : undefined}
        onBlur={stroke ? close : undefined}
        onClick={stroke ? () => setShowStroke((s) => !s) : undefined}
      >
        <div className="char">{radical.char}</div>

        {/* Rendered only while visible: each GIF is downloaded the first time
            someone hovers, not for all 100 cards when the page opens */}
        {stroke && showStroke && (
          <div className="stroke-pop" role="tooltip">
            <img src={stroke.url} alt={`${radical.char}: ${t(lang).strokeOrder}`} />
            <small dir={dirOf(lang)}>{t(lang).strokeOrder}</small>
          </div>
        )}
      </div>

      <div className="label">
        {radical.pinyin} · <span dir={dirOf(lang)}>{nameOf(radical, lang)}</span>
      </div>

      <Forms forms={radical.forms} char={radical.char} />

      <div className="derived">
        {radical.derived.map((d) => (
          <span
            key={d.char}
            className={d.char === highlight ? "hl" : undefined}
            // data-tip is shown by the CSS tooltip (.derived span[data-tip] in App.css)
            data-tip={`${d.pinyin} · ${d.meaning}`}
          >
            {d.char}
          </span>
        ))}
      </div>
    </div>
  );
}
