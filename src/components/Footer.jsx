import { dirOf } from "../i18n";

// Links used in every language
const URL = {
  github: "https://github.com/manuelam00/chinese-radicals-explorer",
  unihan: "https://www.unicode.org/charts/unihan.html",
  junda: "https://lingua.mtsu.edu/chinese-computing/statistics/char/list.php",
  commons: "https://commons.wikimedia.org/",
  course: "https://www.react-graph-gallery.com/react-d3-dataviz-course",
  feral: "https://www.feral-worlding.xyz/",
};

// The footer texts, one block per language.
// They contain links, so they are written as JSX (<>…</>) instead of plain strings,
// which is why they live here and not in i18n.js.
const TEXT = {
  en: {
    dataTitle: "Data and Methods",
    data: [
      <>
        I selected 100 of the most productive Kangxi radicals and built the
        dataset with a small Node.js script that I run once. Radical membership
        and pinyin come from the{" "}
        <a href={URL.unihan}>Unicode Unihan database</a>, which also provides
        the short definitions shown when you hover over a character.
      </>,
      <>
        For each radical, the ten derived characters are the most frequent ones
        in{" "}
        <a href={URL.junda}>Jun Da's Modern Chinese character frequency list</a>
        . The historical forms (oracle bone, bronze, Qin slip, ancient, small
        seal and Liushutong) are public-domain images from{" "}
        <a href={URL.commons}>Wikimedia Commons</a>, found through the Commons
        API and loaded from Commons when the page opens. A dashed box means no
        form was available.
      </>,
      <>
        The Italian, French, and Arabic radical names were generated with Claude
        rather than taken from a dictionary.
      </>,
    ],
    learnTitle: "Learning Process and Special Thanks",
    learn: [
      <>
        I built this explorer to practice JavaScript and React during{" "}
        <a href={URL.course}>Yan Holtz's D3 ❤️ React course</a>. For the header,
        I took inspiration from the new journal{" "}
        <a href={URL.feral}>Feral Worlding</a>.
      </>,
      <>
        I developed the data pipeline and the components with support from
        Claude, which I used as a coding tutor.
      </>,
      <>
        The code is on <a href={URL.github}>GitHub</a>.
      </>,
    ],
    credit: (
      <>
        Manuela Marolla 2026 for{" "}
        <a href={URL.course}>react-d3-dataviz-course</a>
      </>
    ),
  },

  it: {
    dataTitle: "Dati e metodi",
    data: [
      <>
        Ho selezionato 100 dei radicali Kangxi più produttivi e ho costruito il
        dataset con un piccolo script Node.js che eseguo una sola volta.
        L'appartenenza ai radicali e il pinyin provengono dal{" "}
        <a href={URL.unihan}>database Unicode Unihan</a>, che fornisce anche le
        brevi definizioni mostrate quando passi il mouse su un carattere.
      </>,
      <>
        Per ogni radicale, i dieci caratteri derivati sono i più frequenti nella{" "}
        <a href={URL.junda}>
          lista di frequenza dei caratteri del cinese moderno di Jun Da
        </a>
        . Le forme storiche (ossa oracolari, bronzo, listelli Qin, antica,
        piccolo sigillo e Liushutong) sono immagini di pubblico dominio tratte
        da <a href={URL.commons}>Wikimedia Commons</a>, trovate tramite l'API di
        Commons e caricate da Commons all'apertura della pagina. Un riquadro
        tratteggiato indica che non era disponibile alcuna forma.
      </>,
      <>
        I nomi dei radicali in italiano, francese e arabo sono stati generati
        con Claude, non presi da un dizionario.
      </>,
    ],
    learnTitle: "Percorso di apprendimento e ringraziamenti",
    learn: [
      <>
        Ho costruito questo explorer per esercitarmi con JavaScript e React
        durante il <a href={URL.course}>corso D3 ❤️ React di Yan Holtz</a>. Per
        l'intestazione mi sono ispirata alla nuova rivista{" "}
        <a href={URL.feral}>Feral Worlding</a>.
      </>,
      <>
        Ho sviluppato la pipeline dei dati e i componenti con il supporto di
        Claude, che ho usato come supporto per la programmazione.
      </>,
      <>
        Il codice è su <a href={URL.github}>GitHub</a>.
      </>,
    ],
    credit: (
      <>
        Manuela Marolla 2026 per{" "}
        <a href={URL.course}>react-d3-dataviz-course</a>
      </>
    ),
  },

  fr: {
    dataTitle: "Données et méthodes",
    data: [
      <>
        J'ai sélectionné 100 des radicaux Kangxi les plus productifs et
        constitué le jeu de données avec un petit script Node.js que j'exécute
        une seule fois. L'appartenance aux radicaux et le pinyin proviennent de
        la <a href={URL.unihan}>base de données Unicode Unihan</a>, qui fournit
        aussi les courtes définitions affichées au survol d'un caractère.
      </>,
      <>
        Pour chaque radical, les dix caractères dérivés sont les plus fréquents
        de la{" "}
        <a href={URL.junda}>
          liste de fréquence des caractères du chinois moderne de Jun Da
        </a>
        . Les formes historiques (os oraculaires, bronze, lattes Qin, forme
        ancienne, petit sceau et Liushutong) sont des images du domaine public
        provenant de <a href={URL.commons}>Wikimedia Commons</a>, trouvées via
        l'API de Commons et chargées depuis Commons à l'ouverture de la page. Un
        cadre en pointillés signifie qu'aucune forme n'était disponible.
      </>,
      <>
        Les noms des radicaux en italien, en français et en arabe ont été
        générés avec Claude et ne proviennent pas d'un dictionnaire.
      </>,
    ],
    learnTitle: "Parcours d'apprentissage et remerciements",
    learn: [
      <>
        J'ai créé cet explorateur pour m'entraîner à JavaScript et React pendant
        le <a href={URL.course}>cours D3 ❤️ React de Yan Holtz</a>. Pour
        l'en-tête, je me suis inspirée de la nouvelle revue{" "}
        <a href={URL.feral}>Feral Worlding</a>.
      </>,
      <>
        J'ai développé le pipeline de données et les composants avec l'aide de
        Claude, que j'ai utilisé comme tuteur de programmation.
      </>,
      <>
        Le code est sur <a href={URL.github}>GitHub</a>.
      </>,
    ],
    credit: (
      <>
        Manuela Marolla 2026 pour{" "}
        <a href={URL.course}>react-d3-dataviz-course</a>
      </>
    ),
  },

  ar: {
    dataTitle: "البيانات والمنهجية",
    data: [
      <>
        اخترتُ 100 من أكثر جذور كانغشي إنتاجًا، وبنيتُ مجموعة البيانات باستخدام
        سكربت Node.js صغير أشغّله مرة واحدة. انتماء الأحرف إلى الجذور والنطق
        (بينيين) مأخوذان من <a href={URL.unihan}>قاعدة بيانات Unicode Unihan</a>
        ، التي توفّر أيضًا التعريفات المختصرة التي تظهر عند تمرير المؤشر فوق
        الحرف.
      </>,
      <>
        لكل جذر، الأحرف العشرة المشتقة هي الأكثر شيوعًا في{" "}
        <a href={URL.junda}>قائمة جون دا لتردّد أحرف الصينية الحديثة</a>. أما
        الأشكال التاريخية (عظام العرافة، والبرونز، وألواح تشين، والخط القديم،
        والختم الصغير، وليوشوتونغ) فهي صور في الملك العام من{" "}
        <a href={URL.commons}>ويكيميديا كومنز</a>، عُثر عليها عبر واجهة برمجة
        تطبيقات كومنز، وتُحمَّل من كومنز عند فتح الصفحة. يعني الإطار المنقّط أنه
        لا يتوفّر شكل.
      </>,
      <>
        أُنشئت أسماء الجذور بالإيطالية والفرنسية والعربية بمساعدة Claude، ولم
        تؤخذ من قاموس.
      </>,
    ],
    learnTitle: "مسار التعلّم وشكر خاص",
    learn: [
      <>
        أنشأتُ هذا المستكشف للتدرّب على JavaScript وReact خلال{" "}
        <a href={URL.course}>دورة D3 ❤️ React من Yan Holtz</a>. واستلهمتُ تصميم
        الترويسة من المجلة الجديدة <a href={URL.feral}>Feral Worlding</a>.
      </>,
      <>
        طوّرتُ مسار معالجة البيانات والمكوّنات بدعم من Claude، الذي استخدمته
        مدرّسًا للبرمجة.
      </>,
      <>
        الشيفرة متاحة على <a href={URL.github}>GitHub</a>.
      </>,
    ],
    credit: (
      <>
        Manuela Marolla، 2026، لدورة{" "}
        <a href={URL.course}>react-d3-dataviz-course</a>
      </>
    ),
  },
};

// Props:
//   lang – "en" | "it" | "fr" | "ar" (passed down from App)
export default function Footer({ lang }) {
  const tx = TEXT[lang] ?? TEXT.en;
  const dir = dirOf(lang); // Arabic is right to left

  return (
    <>
      <footer className="footer" dir={dir}>
        <div className="footer-inner">
          <div>
            <h3>{tx.dataTitle}</h3>
            {tx.data.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div>
            <h3>{tx.learnTitle}</h3>
            {tx.learn.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </footer>

      <p className="footer-credit" dir={dir}>
        {tx.credit}
      </p>
    </>
  );
}
