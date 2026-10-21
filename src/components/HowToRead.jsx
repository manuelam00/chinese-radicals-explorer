import RadicalCard from "./RadicalCard";
import { t, nameOf, dirOf } from "../i18n";

// Small hand-drawn-looking arrow pointing right (towards the card)
function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 60 20" width="44" height="15" aria-hidden="true">
      <path d="M2 14 C 20 2, 38 2, 54 10" />
      <path d="M46 4 L55 10 L45 15" />
    </svg>
  );
}

// Commons "Special:FilePath" redirects to the real image file
const HAO_ORACLE = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent("好-oracle.svg")}`;

export default function HowToRead({ radicals, lang }) {
  const woman = radicals.find((r) => r.id === 38); // 女
  const child = radicals.find((r) => r.id === 39); // 子
  if (!woman) return null;

  const tx = t(lang);
  const dir = dirOf(lang);

  return (
    <section className="howto">
      {/* The grid has 2 rows: row 1 = title (above the card only), row 2 = everything else */}
      <div className="howto-grid">
        <h2 className="howto-title" dir={dir}>{tx.howTitle}</h2>

        {/* Annotations: same row heights as the card, so each sits next to its row */}
        <ol className="annotations">
          <li><span dir={dir}>{tx.annChar}</span><Arrow /></li>
          <li><span dir={dir}>{tx.annLabel}</span><Arrow /></li>
          <li><span dir={dir}>{tx.annForms}</span><Arrow /></li>
          <li><span dir={dir}>{tx.annDerived}</span><Arrow /></li>
        </ol>

        <RadicalCard radical={woman} lang={lang} highlight="好" />

        {/* Curved arrow from the circled 好 to the explanation.
            preserveAspectRatio="none" lets it stretch to the card's height;
            vector-effect keeps the line thin while stretching. */}
        <svg className="connector" viewBox="0 0 80 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 80 C 45 80, 30 50, 76 50" vectorEffect="non-scaling-stroke" />
          <path d="M68 45 L77 50 L68 55" vectorEffect="non-scaling-stroke" />
        </svg>

        <aside className="hao-card">
          <img
            src={HAO_ORACLE}
            alt="好 oracle bone form"
            className="hao-oracle"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="hao-char">好</div>
          <div className="hao-pinyin">
            hǎo · <span dir={dir}>{tx.good}</span>
          </div>

          <div className="hao-formula">
            <span><b>女</b><small dir={dir}>{nameOf(woman, lang)}</small></span>
            <em>+</em>
            <span><b>子</b><small dir={dir}>{nameOf(child, lang)}</small></span>
            <em>=</em>
            <span><b className="seal">好</b><small dir={dir}>{tx.good}</small></span>
          </div>

          <p dir={dir}>{tx.haoText}</p>
        </aside>
      </div>
    </section>
  );
}
