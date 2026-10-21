import { nameOf, dirOf } from "../i18n";

const ERAS = [
  { key: "oracle", label: "Oracle" },
  { key: "bronze", label: "Bronze" },
  { key: "slip", label: "Slip" },
  { key: "ancient", label: "Ancient" },
  { key: "seal", label: "Seal" },
  { key: "liushutong", label: "LST" },
];

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

      <div className="forms">
        {ERAS.map(({ key, label }) => {
          const f = radical.forms[key];
          return (
            <div key={key} className="form" title={label}>
              {f ? <img src={f.url} alt={`${radical.char} ${label}`} /> : <span className="empty" />}
              <small>{label}</small>
            </div>
          );
        })}
      </div>

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
