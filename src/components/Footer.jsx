// TODO: replace with your own GitHub repository URL
const GITHUB_URL = "https://github.com/";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3>Data and Methods</h3>
          <p>
            I selected 100 of the most productive Kangxi radicals and built the dataset with a small
            Node.js script that runs once, before the app starts. Radical membership, pinyin and
            definitions come from the{" "}
            <a href="https://www.unicode.org/charts/unihan.html">Unicode Unihan database</a>.
          </p>
          <p>
            For each radical, the ten derived characters are the most frequent ones in Jun Da's
            Modern Chinese character frequency list. The historical forms (oracle bone, bronze,
            Qin slip, ancient, small seal and Liushutong) are images from{" "}
            <a href="https://commons.wikimedia.org/">Wikimedia Commons</a>, found through the Commons
            API; their licenses and authors are recorded in the dataset. A dashed box means no form
            was available.
          </p>
          <p>
            The Italian, French and Arabic radical names were drafted with the help of Claude and
            are not taken from a dictionary.
          </p>
        </div>

        <div>
          <h3>Learning Process and Special Thanks</h3>
          <p>
            I built this explorer to practise React and D3.js during{" "}
            <a href="https://www.react-graph-gallery.com/react-d3-dataviz-course">
              Yan Holtz's D3 ❤️ React course
            </a>
            . Many thanks to Yan for the course and for the React Graph Gallery.
          </p>
          <p>
            I developed the data pipeline and the components with support from Claude, by
            Anthropic, which I used as a coding tutor while learning React and JavaScript.
          </p>
          <p>
            The code is on <a href={GITHUB_URL}>GitHub</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
