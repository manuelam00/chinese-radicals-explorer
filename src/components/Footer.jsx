// TODO: replace with your own GitHub repository URL
const GITHUB_URL = "https://github.com/manuelam00/chinese-radicals-explorer";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h3>Data and Methods</h3>
            <p>
              I selected 100 of the most productive Kangxi radicals and built
              the dataset with a small Node.js script that I run once. Radical
              membership and pinyin come from the{" "}
              <a href="https://www.unicode.org/charts/unihan.html">
                Unicode Unihan database
              </a>
              , which also provides the short definitions shown when you hover
              over a character.
            </p>
            <p>
              For each radical, the ten derived characters are the most frequent
              ones in{" "}
              <a href="https://lingua.mtsu.edu/chinese-computing/statistics/char/list.php">
                Jun Da's Modern Chinese character frequency list
              </a>
              . The historical forms (oracle bone, bronze, Qin slip, ancient,
              small seal and Liushutong) are public-domain images from{" "}
              <a href="https://commons.wikimedia.org/">Wikimedia Commons</a>,
              found through the Commons API and loaded from Commons when the
              page opens. A dashed box means no form was available.
            </p>
            <p>
              The Italian, French, and Arabic radical names were generated with
              Claude rather than taken from a dictionary.
            </p>
          </div>

          <div>
            <h3>Learning Process and Special Thanks</h3>
            <p>
              I built this explorer to practise Javascript and React during{" "}
              <a href="https://www.react-graph-gallery.com/react-d3-dataviz-course">
                Yan Holtz's D3 ❤️ React course
              </a>
              . For the header, I took inspiration from the new journal{" "}
              <a href="https://www.feral-worlding.xyz/">Feral Worlding</a>.
            </p>
            <p>
              I developed the data pipeline and the components with support from
              Claude, which I used as a coding tutor.
            </p>
            <p>
              The code is on <a href={GITHUB_URL}>GitHub</a>.
            </p>
          </div>
        </div>
      </footer>
      <p className="footer-credit">
        Manuela Marolla 2026 for{" "}
        <a href="https://www.react-graph-gallery.com/react-d3-dataviz-course">
          react-d3-dataviz-course
        </a>
      </p>
    </>
  );
}
