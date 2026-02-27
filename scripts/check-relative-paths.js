const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const HTML_FILES = ["index.html", "services.html", "projects.html", "about.html", "contact.html"];
const ATTR_REGEX = /\b(?:src|href)="([^"]+)"/g;

function isSkippable(url) {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("#") ||
    url.trim() === ""
  );
}

function main() {
  const errors = [];

  HTML_FILES.forEach((file) => {
    const absoluteFile = path.join(ROOT, file);
    const html = fs.readFileSync(absoluteFile, "utf8");
    const baseDir = path.dirname(absoluteFile);

    let match = ATTR_REGEX.exec(html);
    while (match) {
      const rawUrl = match[1];
      const cleanUrl = rawUrl.split("?")[0].split("#")[0];

      if (!isSkippable(cleanUrl)) {
        if (cleanUrl.startsWith("/")) {
          errors.push(`${file}: root-absolute path is not GitHub Pages-safe -> ${rawUrl}`);
        } else {
          const target = path.resolve(baseDir, cleanUrl);
          if (!fs.existsSync(target)) {
            errors.push(`${file}: missing relative asset/link -> ${rawUrl}`);
          }
        }
      }

      match = ATTR_REGEX.exec(html);
    }
  });

  if (errors.length) {
    console.error("Path check failed:");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`Validated relative paths in ${HTML_FILES.length} HTML files.`);
}

main();
