#!/usr/bin/env node
/**
 * Build radicals.json for the Chinese Radicals Explorer (D3 + React).
 *
 * Data sources (no HTML scraping):
 *   - Unihan database (Unicode)  -> radical membership (kRSUnicode), pinyin (kMandarin), definition (kDefinition)
 *   - A character frequency list -> ranks derived characters, keeps the top N
 *   - Wikimedia Commons API      -> which historical-form SVGs / stroke-order GIFs exist, + license & author
 *
 * Usage (Node 18+):
 *   node build-radicals.mjs --unihan ./Unihan --freq ./char_freq.txt [--out radicals.json] [--top 10] [--download ./public/forms]
 *
 *   --unihan    folder containing the extracted Unihan_*.txt files
 *   --freq      text file with one character per line in frequency order (rank = line order;
 *               the first Han character on each line is used, so extra columns are fine). Must be UTF-8.
 *   --download  optional: also download every found image into this folder (recommended: serve locally)
 *   --no-commons  skip the Commons lookup (useful for quick offline tests)
 *   --cache     where to store Commons answers between runs (default data-raw/commons-cache.json)
 */
import fs from "node:fs/promises";
import path from "node:path";

// ⚠️ Wikimedia asks bots to identify themselves with a contact. Put your email here.
const USER_AGENT =
  "RadicalsExplorer/0.1 (personal D3+React learning project; contact: manuelam.mrl@gmail.com)";

// [display, Kangxi radical number(s), base form used for historical images on Commons, English name]
// Notes:
//  - Unihan does not distinguish positional variants (氵 vs 水, 忄 vs 心, 扌 vs 手): they share a radical number.
//  - 月 includes 130 (肉 "flesh"), because most 月-side characters (脸, 脑, 胖) are classified under 肉.
//  - Historical forms exist for the full/traditional character, so variants point to their base (氵 -> 水).
const RADICALS = [
  ["人", [9], "人", "person"],
  ["口", [30], "口", "mouth"],
  ["土", [32], "土", "earth"],
  ["女", [38], "女", "woman"],
  ["心", [61], "心", "heart"],
  ["手", [64], "手", "hand"],
  ["日", [72], "日", "sun"],
  ["月", [74, 130], "月", "moon / flesh"],
  ["木", [75], "木", "tree"],
  ["氵", [85], "水", "water"],
  ["火", [86], "火", "fire"],
  ["纟", [120], "糸", "silk"],
  ["艹", [140], "艸", "grass"],
  ["讠", [149], "言", "speech"],
  ["辶", [162], "辵", "walk"],
  ["钅", [167], "金", "metal"],
  ["刂", [18], "刀", "knife"],
  ["宀", [40], "宀", "roof"],
  ["贝", [154], "貝", "shell / money"],
  ["一", [1], "一", "one"],
  ["力", [19], "力", "strength"],
  ["又", [29], "又", "right hand / again"],
  ["犭", [94], "犬", "dog / beast"],
  ["禾", [115], "禾", "grain"],
  ["⺮", [118], "竹", "bamboo"],
  ["虫", [142], "虫", "insect"],
  ["阝", [170], "阜", "mound (left 阝)"],
  ["大", [37], "大", "big"],
  ["广", [53], "广", "shelter"],
  ["田", [102], "田", "field"],
  ["目", [109], "目", "eye"],
  ["石", [112], "石", "stone"],
  ["衤", [145], "衣", "clothing"],
  ["足", [157], "足", "foot"],
  ["马", [187], "馬", "horse"],
  ["页", [181], "頁", "head"],
  ["巾", [50], "巾", "cloth"],
  ["米", [119], "米", "rice"],
  ["车", [159], "車", "vehicle"],
  ["八", [12], "八", "eight"],
  ["尸", [44], "尸", "corpse / body"],
  ["寸", [41], "寸", "inch"],
  ["山", [46], "山", "mountain"],
  ["攵", [66], "攴", "tap / strike"],
  ["彳", [60], "彳", "step"],
  ["十", [24], "十", "ten"],
  ["工", [48], "工", "work"],
  ["方", [70], "方", "square"],
  ["门", [169], "門", "gate"],
  ["饣", [184], "食", "food"],
  ["欠", [76], "欠", "yawn / lack"],
  ["儿", [10], "儿", "legs / son"],
  ["冫", [15], "仌", "ice"],
  ["子", [39], "子", "child"],
  ["疒", [104], "疒", "sickness"],
  ["隹", [172], "隹", "short-tailed bird"],
  ["斤", [69], "斤", "axe"],
  ["亠", [8], "亠", "lid"],
  ["王", [96], "玉", "jade / king"],
  ["白", [106], "白", "white"],
  ["立", [117], "立", "stand"],
  ["羊", [123], "羊", "sheep"],
  ["艮", [138], "艮", "stopping"],
  ["冖", [14], "冖", "cover"],
  ["厂", [27], "厂", "cliff"],
  ["皿", [108], "皿", "dish"],
  ["礻", [113], "示", "spirit / altar"],
  ["穴", [116], "穴", "cave"],
  ["走", [156], "走", "run / walk"],
  ["雨", [173], "雨", "rain"],
  ["囗", [31], "囗", "enclosure"],
  ["小", [42], "小", "small"],
  ["戈", [62], "戈", "halberd"],
  ["几", [16], "几", "table"],
  ["舌", [135], "舌", "tongue"],
  ["干", [51], "干", "dry / shield"],
  ["殳", [79], "殳", "weapon"],
  ["夕", [36], "夕", "evening"],
  ["止", [77], "止", "stop"],
  ["牜", [93], "牛", "cow"],
  ["皮", [107], "皮", "skin"],
  ["耳", [128], "耳", "ear"],
  ["辛", [160], "辛", "bitter"],
  ["阝", [163], "邑", "city (right 阝)"],
  ["酉", [164], "酉", "wine vessel"],
  ["青", [174], "青", "blue-green"],
  ["鸟", [196], "鳥", "bird"],
  ["弓", [57], "弓", "bow"],
  ["厶", [28], "厶", "private"],
  ["户", [63], "戶", "door"],
  ["羽", [124], "羽", "feather"],
  ["舟", [137], "舟", "boat"],
  ["里", [166], "里", "village"],
  ["匕", [21], "匕", "spoon"],
  ["夂", [34], "夂", "go slowly"],
  ["见", [147], "見", "see"],
  ["卩", [26], "卩", "seal"],
  ["罒", [122], "网", "net"],
  ["士", [33], "士", "scholar"],
  ["勹", [20], "勹", "wrap"],
];

// Radical names in other languages, keyed by the first Kangxi number (same as `id` in the output).
// [Italian, French, Arabic]
const TRANSLATIONS = {
  9: ["persona", "personne", "إنسان"],
  30: ["bocca", "bouche", "فم"],
  32: ["terra", "terre", "تراب"],
  38: ["donna", "femme", "امرأة"],
  61: ["cuore", "cœur", "قلب"],
  64: ["mano", "main", "يد"],
  72: ["sole", "soleil", "شمس"],
  74: ["luna / carne", "lune / chair", "قمر / لحم"],
  75: ["albero", "arbre", "شجرة"],
  85: ["acqua", "eau", "ماء"],
  86: ["fuoco", "feu", "نار"],
  120: ["seta", "soie", "حرير"],
  140: ["erba", "herbe", "عشب"],
  149: ["parola", "parole", "كلام"],
  162: ["camminare", "marcher", "مشي"],
  167: ["metallo", "métal", "معدن"],
  18: ["coltello", "couteau", "سكين"],
  40: ["tetto", "toit", "سقف"],
  154: ["conchiglia / denaro", "coquillage / argent", "صدفة / مال"],
  1: ["uno", "un", "واحد"],
  19: ["forza", "force", "قوة"],
  29: [
    "mano destra / ancora",
    "main droite / encore",
    "اليد اليمنى / مرة أخرى",
  ],
  94: ["cane / bestia", "chien / bête", "كلب / حيوان"],
  115: ["cereale", "céréale", "حبوب"],
  118: ["bambù", "bambou", "خيزران"],
  142: ["insetto", "insecte", "حشرة"],
  170: ["collina (阝 sinistro)", "colline (阝 gauche)", "تلّ (阝 اليسرى)"],
  37: ["grande", "grand", "كبير"],
  53: ["riparo", "abri", "مأوى"],
  102: ["campo", "champ", "حقل"],
  109: ["occhio", "œil", "عين"],
  112: ["pietra", "pierre", "حجر"],
  145: ["abito", "vêtement", "ثياب"],
  157: ["piede", "pied", "قدم"],
  187: ["cavallo", "cheval", "حصان"],
  181: ["testa", "tête", "رأس"],
  50: ["panno", "tissu", "قماش"],
  119: ["riso", "riz", "أرز"],
  159: ["veicolo", "véhicule", "عربة"],
  12: ["otto", "huit", "ثمانية"],
  44: ["corpo / cadavere", "corps / cadavre", "جسد / جثة"],
  41: ["pollice (misura)", "pouce (mesure)", "بوصة"],
  46: ["montagna", "montagne", "جبل"],
  66: ["colpire", "frapper", "ضرب"],
  60: ["passo", "pas", "خطوة"],
  24: ["dieci", "dix", "عشرة"],
  48: ["lavoro", "travail", "عمل"],
  70: ["quadrato", "carré", "مربع"],
  169: ["cancello", "portail", "بوابة"],
  184: ["cibo", "nourriture", "طعام"],
  76: ["sbadigliare / mancare", "bâiller / manquer", "تثاؤب / نقص"],
  10: ["gambe / figlio", "jambes / fils", "ساقان / ابن"],
  15: ["ghiaccio", "glace", "جليد"],
  39: ["bambino", "enfant", "طفل"],
  104: ["malattia", "maladie", "مرض"],
  172: ["uccello dalla coda corta", "oiseau à queue courte", "طائر قصير الذيل"],
  69: ["ascia", "hache", "فأس"],
  8: ["coperchio", "couvercle", "غطاء"],
  96: ["giada / re", "jade / roi", "يشم / ملك"],
  106: ["bianco", "blanc", "أبيض"],
  117: ["stare in piedi", "se tenir debout", "وقوف"],
  123: ["pecora", "mouton", "خروف"],
  138: ["fermezza", "fermeté", "ثبات"],
  14: ["copertura", "couverture", "ستار"],
  27: ["dirupo", "falaise", "جرف"],
  108: ["piatto", "plat", "صحن"],
  113: ["spirito / altare", "esprit / autel", "روح / مذبح"],
  116: ["grotta", "grotte", "كهف"],
  156: ["correre", "courir", "ركض"],
  173: ["pioggia", "pluie", "مطر"],
  31: ["recinto", "enclos", "سياج"],
  42: ["piccolo", "petit", "صغير"],
  62: ["alabarda", "hallebarde", "حربة"],
  16: ["tavolino", "table basse", "طاولة"],
  135: ["lingua", "langue", "لسان"],
  51: ["secco / scudo", "sec / bouclier", "جاف / درع"],
  79: ["arma", "arme", "سلاح"],
  36: ["sera", "soir", "مساء"],
  77: ["fermarsi", "s'arrêter", "توقّف"],
  93: ["mucca", "vache", "بقرة"],
  107: ["pelle", "peau", "جلد"],
  128: ["orecchio", "oreille", "أذن"],
  160: ["amaro / piccante", "amer / piquant", "مرّ / لاذع"],
  163: ["città (阝 destro)", "ville (阝 droite)", "مدينة (阝 اليمنى)"],
  164: ["vaso da vino", "jarre à vin", "إناء الخمر"],
  174: ["verde-azzurro", "bleu-vert", "أزرق مخضرّ"],
  196: ["uccello", "oiseau", "طائر"],
  57: ["arco", "arc", "قوس"],
  28: ["privato", "privé", "خاص"],
  63: ["porta", "porte", "باب"],
  124: ["piuma", "plume", "ريش"],
  137: ["barca", "bateau", "قارب"],
  166: ["villaggio", "village", "قرية"],
  21: ["cucchiaio", "cuillère", "ملعقة"],
  34: ["andare lentamente", "aller lentement", "المشي ببطء"],
  147: ["vedere", "voir", "رؤية"],
  26: ["sigillo", "sceau", "ختم"],
  122: ["rete", "filet", "شبكة"],
  33: ["studioso", "lettré", "عالِم"],
  20: ["avvolgere", "envelopper", "لفّ"],
};

// Historical-form file suffixes, as used by Wiktionary's "Historical forms" table.
// Verify the Liushutong suffix on a couple of characters; the script simply reports null if absent.
const FORM_SUFFIXES = {
  oracle: "oracle.svg",
  bronze: "bronze.svg",
  slip: "slip.svg",
  ancient: "ancient.svg",
  seal: "seal.svg",
  liushutong: "bigseal.svg",
};
const STROKE_SUFFIXES = ["order.gif", "bw.png"]; // first match wins

// ---------- helpers ----------
function parseArgs(argv) {
  const a = {
    out: "radicals.json",
    top: 10,
    commons: true,
    cache: "data-raw/commons-cache.json",
  };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--unihan") a.unihan = argv[++i];
    else if (k === "--freq") a.freq = argv[++i];
    else if (k === "--out") a.out = argv[++i];
    else if (k === "--top") a.top = Number(argv[++i]);
    else if (k === "--download") a.download = argv[++i];
    else if (k === "--no-commons") a.commons = false;
    else if (k === "--cache") a.cache = argv[++i];
  }
  if (!a.unihan || !a.freq) {
    console.error(
      "Usage: node build-radicals.mjs --unihan ./Unihan --freq ./char_freq.txt [--out radicals.json] [--top 10] [--download ./public/forms]",
    );
    process.exit(1);
  }
  return a;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stripHtml = (s) =>
  (s ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

async function loadUnihan(dir) {
  const wanted = new Set(["kRSUnicode", "kMandarin", "kDefinition"]);
  const db = new Map();
  const files = (await fs.readdir(dir)).filter((f) =>
    /^Unihan.*\.txt$/.test(f),
  );
  if (!files.length) throw new Error(`No Unihan_*.txt files found in ${dir}`);
  for (const f of files) {
    const text = await fs.readFile(path.join(dir, f), "utf8");
    for (const line of text.split("\n")) {
      if (!line.startsWith("U+")) continue;
      const [cp, field, value] = line.split("\t");
      if (!wanted.has(field)) continue;
      const ch = String.fromCodePoint(parseInt(cp.slice(2), 16));
      if (!db.has(ch)) db.set(ch, {});
      db.get(ch)[field] = value?.trim();
    }
  }
  return db;
}

async function loadFrequency(file) {
  const text = await fs.readFile(file, "utf8");
  const rank = new Map();
  let r = 0;
  for (const line of text.split("\n")) {
    const m = line.match(/\p{Script=Han}/u);
    if (m && !rank.has(m[0])) rank.set(m[0], ++r);
  }
  if (!rank.size)
    throw new Error(`No Han characters found in ${file} (is it UTF-8?)`);
  return rank;
}

const pinyinOf = (db, ch) => db.get(ch)?.kMandarin?.split(" ")[0] ?? null;
const definitionOf = (db, ch) =>
  db.get(ch)?.kDefinition?.split(";")[0].trim() ?? null;

// radical number -> [{char, rank}] for characters that appear in the frequency list
function indexByRadical(db, freq) {
  const by = new Map();
  for (const [ch, f] of db) {
    if (!f.kRSUnicode || !freq.has(ch)) continue;
    const seen = new Set();
    for (const v of f.kRSUnicode.split(/\s+/)) {
      const m = v.match(/^(\d+)'*\.(-?\d+)$/);
      if (!m) continue;
      const rad = Number(m[1]);
      const residual = Number(m[2]);
      if (residual <= 0 || seen.has(rad)) continue; // skip the radical itself
      seen.add(rad);
      if (!by.has(rad)) by.set(rad, []);
      by.get(rad).push({ char: ch, rank: freq.get(ch) });
    }
  }
  return by;
}

// Fetch with polite retries: on 429 (too many requests) or 5xx, wait and try again.
// Uses the server's Retry-After header when given, otherwise 5s, 10s, 20s, 40s, 80s.
async function fetchWithRetry(url, options, attempts = 6) {
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    if (res.status !== 429 && res.status < 500)
      throw new Error(`Commons API HTTP ${res.status}`);
    const wait = Number(res.headers.get("retry-after")) * 1000 || 5000 * 2 ** i;
    console.log(
      `\n  Commons said ${res.status}, waiting ${Math.round(wait / 1000)}s before retrying…`,
    );
    await sleep(wait);
  }
  throw new Error("Commons API still rate-limited after several retries");
}

async function readCache(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return {};
  }
}

// Ask Commons which files exist (50 titles per request), with license + author for attribution.
// Answers are saved in a cache file, so later runs only ask about files not seen before.
async function lookupCommons(fileNames, cacheFile) {
  const cache = await readCache(cacheFile);
  const unique = [...new Set(fileNames)];
  const todo = unique.filter((n) => !(n in cache));
  console.log(
    `  ${unique.length - todo.length} files already in cache, ${todo.length} to ask about`,
  );

  for (let i = 0; i < todo.length; i += 50) {
    const batch = todo.slice(i, i + 50);
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiextmetadatafilter: "LicenseShortName|Artist",
      titles: batch.map((n) => `File:${n}`).join("|"),
    });
    let json;
    try {
      const res = await fetchWithRetry(
        `https://commons.wikimedia.org/w/api.php?${params}`,
        {
          headers: { "User-Agent": USER_AGENT, "Api-User-Agent": USER_AGENT },
        },
      );
      json = await res.json();
    } catch (err) {
      // Don't crash: write the JSON with what we have; run again later to fill the gaps
      console.warn(
        `\n  ! ${err.message}. Continuing without the remaining images — run the script again later.`,
      );
      break;
    }
    const back = new Map(
      (json.query?.normalized ?? []).map((n) => [n.to, n.from]),
    );
    for (const p of json.query?.pages ?? []) {
      const original = (back.get(p.title) ?? p.title).replace(/^File:/, "");
      if (p.missing || !p.imageinfo?.length) {
        cache[original] = null;
        continue;
      }
      const ii = p.imageinfo[0];
      cache[original] = {
        file: original,
        url: ii.url,
        page: ii.descriptionurl,
        license: ii.extmetadata?.LicenseShortName?.value ?? null,
        artist: stripHtml(ii.extmetadata?.Artist?.value),
      };
    }
    await fs.mkdir(path.dirname(cacheFile), { recursive: true });
    await fs.writeFile(cacheFile, JSON.stringify(cache, null, 1), "utf8"); // save progress
    process.stdout.write(
      `  Commons: ${Math.min(i + 50, todo.length)}/${todo.length}\r`,
    );
    await sleep(1500); // be gentle
  }
  process.stdout.write("\n");
  return new Map(Object.entries(cache));
}

async function downloadAll(images, dir) {
  await fs.mkdir(dir, { recursive: true });
  for (const img of images) {
    const dest = path.join(dir, img.file);
    try {
      await fs.access(dest);
      img.local = img.file;
      continue;
    } catch {}
    const res = await fetch(img.url, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok) {
      console.warn(`  ! could not download ${img.file} (${res.status})`);
      continue;
    }
    await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
    img.local = img.file;
    await sleep(300);
  }
}

// ---------- main ----------
const args = parseArgs(process.argv);
console.log("Loading Unihan…");
const db = await loadUnihan(args.unihan);
console.log(`  ${db.size} characters`);
console.log("Loading frequency list…");
const freq = await loadFrequency(args.freq);
console.log(`  ${freq.size} ranked characters`);
const byRadical = indexByRadical(db, freq);

const radicals = RADICALS.map(([char, kangxi, base, name]) => {
  const pool = new Map();
  for (const k of kangxi)
    for (const d of byRadical.get(k) ?? []) pool.set(d.char, d);
  const derived = [...pool.values()]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, args.top)
    .map((d) => ({
      char: d.char,
      pinyin: pinyinOf(db, d.char),
      meaning: definitionOf(db, d.char),
      freqRank: d.rank,
    }));
  return {
    id: kangxi[0], // unique, and handy as a D3 key
    char,
    base,
    kangxi,
    name,
    names: {
      en: name,
      it: TRANSLATIONS[kangxi[0]]?.[0] ?? null,
      fr: TRANSLATIONS[kangxi[0]]?.[1] ?? null,
      ar: TRANSLATIONS[kangxi[0]]?.[2] ?? null,
    },
    pinyin: pinyinOf(db, char) ?? pinyinOf(db, base),
    definition: definitionOf(db, base) ?? definitionOf(db, char),
    strokeImage: null,
    forms: Object.fromEntries(Object.keys(FORM_SUFFIXES).map((k) => [k, null])),
    derived,
  };
});

if (args.commons) {
  console.log("Checking Wikimedia Commons…");
  const names = [];
  for (const r of radicals) {
    for (const s of Object.values(FORM_SUFFIXES)) names.push(`${r.base}-${s}`);
    for (const c of new Set([r.char, r.base]))
      for (const s of STROKE_SUFFIXES) names.push(`${c}-${s}`);
  }
  const info = await lookupCommons(names, args.cache);
  for (const r of radicals) {
    for (const [era, s] of Object.entries(FORM_SUFFIXES))
      r.forms[era] = info.get(`${r.base}-${s}`) ?? null;
    outer: for (const c of new Set([r.char, r.base]))
      for (const s of STROKE_SUFFIXES) {
        const hit = info.get(`${c}-${s}`);
        if (hit) {
          r.strokeImage = hit;
          break outer;
        }
      }
  }
  if (args.download) {
    console.log(`Downloading images to ${args.download}…`);
    const all = radicals
      .flatMap((r) => [r.strokeImage, ...Object.values(r.forms)])
      .filter(Boolean);
    await downloadAll(all, args.download);
  }
}

const output = {
  meta: {
    generatedAt: new Date().toISOString(),
    attribution: [
      "Radical membership, readings and definitions: Unicode Unihan Database (Unicode License).",
      "Character frequency ranks: see the frequency list you supplied (credit its author).",
      "Images: Wikimedia Commons; license and author recorded per file in this JSON.",
    ],
  },
  radicals,
};
await fs.writeFile(args.out, JSON.stringify(output, null, 2), "utf8");

// Quick coverage report
const eras = Object.keys(FORM_SUFFIXES);
console.log(`\nWrote ${args.out}: ${radicals.length} radicals`);
for (const e of eras)
  console.log(
    `  ${e.padEnd(11)} ${radicals.filter((r) => r.forms[e]).length}/${radicals.length}`,
  );
console.log(
  `  stroke img  ${radicals.filter((r) => r.strokeImage).length}/${radicals.length}`,
);
const thin = radicals
  .filter((r) => r.derived.length < args.top)
  .map((r) => `${r.char}(${r.derived.length})`);
if (thin.length)
  console.log(`  fewer than ${args.top} derived: ${thin.join(" ")}`);
