import { useState } from "react";
import { nameOf, dirOf } from "../i18n";

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
  return (
    <div className="card">
      <div className="char">{radical.char}</div>

      <div className="label">
        {radical.pinyin} · <span dir={dirOf(lang)}>{nameOf(radical, lang)}</span>
      </div>

      <Forms forms={radical.forms} char={radical.char} />

      <div className="derived">
        {radical.derived.map((d) => (
          <span
            key={d.char}
            className={d.char === highlight ? "hl" : undefined}
            title={`${d.pinyin} · ${d.meaning}`}
          >
            {d.char}
          </span>
        ))}
      </div>
    </div>
  );
}
