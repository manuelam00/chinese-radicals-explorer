import RadicalCard, { Forms } from "./RadicalCard";
import { t, nameOf, dirOf } from "../i18n";

// Commons "Special:FilePath" redirects to the real image file
const commons = (file) => ({
  url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`,
});

// The forms listed in Wiktionary's "Historical forms of the character 好" table.
// There is no slip or ancient form, so those two cells show the dashed box.
const HAO_FORMS = {
  oracle: commons("好-oracle.svg"),
  bronze: commons("好-bronze.svg"),
  slip: null,
  ancient: null,
  seal: commons("好-seal.svg"),
  liushutong: commons("好-bigseal.svg"),
};

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

        {/* Annotations: same row heights as the card, so each sits next to its row.
            The thin line after each label is drawn in CSS (.annotations li::after) */}
        <ol className="annotations">
          <li><span dir={dir}>{tx.annChar}</span></li>
          <li><span dir={dir}>{tx.annLabel}</span></li>
          <li><span dir={dir}>{tx.annForms}</span></li>
          <li><span dir={dir}>{tx.annDerived}</span></li>
        </ol>

        <RadicalCard radical={woman} lang={lang} highlight="好" />

        {/* Right-angle connector from the row of characters (bottom left)
            to the big 好 (top right): across, up, across. Drawn in CSS. */}
        <div className="connector" aria-hidden="true">
          <i className="connector-head" />
        </div>

        {/* Same 4 rows as the 女 card, so each row lines up with its neighbor:
            1 character · 2 pinyin and meaning · 3 historical forms · 4 formula + note */}
        <aside className="hao-card">
          <div className="hao-char">好</div>

          <div className="hao-pinyin">
            hǎo · <span dir={dir}>{tx.good}</span>
          </div>

          <Forms forms={HAO_FORMS} char="好" />

          <div className="hao-bottom">
            <div className="hao-formula">
              <span><b>女</b><small dir={dir}>{nameOf(woman, lang)}</small></span>
              <em>+</em>
              <span><b>子</b><small dir={dir}>{nameOf(child, lang)}</small></span>
              <em>=</em>
              <span><b className="seal">好</b><small dir={dir}>{tx.good}</small></span>
            </div>

            <p dir={dir}>{tx.haoText}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
