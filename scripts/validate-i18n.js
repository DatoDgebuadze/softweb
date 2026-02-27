const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const HTML_FILES = ["index.html", "services.html", "projects.html", "about.html", "contact.html"];
const MAIN_JS = path.join(ROOT, "js", "main.js");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) throw new Error(`Marker not found: ${marker}`);

  const braceStart = source.indexOf("{", markerIndex);
  if (braceStart === -1) throw new Error(`Object start not found after marker: ${marker}`);

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = braceStart; i < source.length; i += 1) {
    const ch = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(braceStart, i + 1);
    }
  }

  throw new Error(`Unclosed object literal for marker: ${marker}`);
}

function extractNestedObjectByKey(source, key) {
  const keyPattern = new RegExp(`${key}\\s*:\\s*\\{`, "m");
  const match = keyPattern.exec(source);
  if (!match) throw new Error(`Key object not found: ${key}`);

  const startIndex = source.indexOf("{", match.index);
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = startIndex; i < source.length; i += 1) {
    const ch = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(startIndex, i + 1);
    }
  }

  throw new Error(`Unclosed nested object for key: ${key}`);
}

function extractObjectKeys(objectLiteral) {
  const keys = new Set();
  const keyRegex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
  let match = keyRegex.exec(objectLiteral);
  while (match) {
    keys.add(match[1]);
    match = keyRegex.exec(objectLiteral);
  }
  return keys;
}

function extractHtmlI18nKeys(html) {
  const keys = new Set();
  const nodeKeyRegex = /data-i18n="([^"]+)"/g;
  const attrKeyRegex = /data-i18n-attr="([^"]+)"/g;

  let match = nodeKeyRegex.exec(html);
  while (match) {
    keys.add(match[1]);
    match = nodeKeyRegex.exec(html);
  }

  match = attrKeyRegex.exec(html);
  while (match) {
    match[1].split("|").forEach((entry) => {
      const pair = entry.split(":");
      if (pair.length === 2 && pair[1]) keys.add(pair[1]);
    });
    match = attrKeyRegex.exec(html);
  }

  return keys;
}

function toSortedArray(set) {
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function main() {
  const mainJs = read(MAIN_JS);
  const translationsBlock = extractObjectLiteral(mainJs, "const translations =");
  const enBase = extractNestedObjectByKey(translationsBlock, "en");
  const kaBase = extractNestedObjectByKey(translationsBlock, "ka");
  const enServices = extractObjectLiteral(mainJs, "const enServiceTranslations =");
  const kaServices = extractObjectLiteral(mainJs, "const kaServiceTranslations =");

  const enKeys = new Set([...extractObjectKeys(enBase), ...extractObjectKeys(enServices)]);
  const kaKeys = new Set([...extractObjectKeys(kaBase), ...extractObjectKeys(kaServices)]);

  const htmlKeys = new Set();
  HTML_FILES.forEach((file) => {
    const html = read(path.join(ROOT, file));
    extractHtmlI18nKeys(html).forEach((key) => htmlKeys.add(key));
  });

  const missingInEn = toSortedArray(new Set([...htmlKeys].filter((k) => !enKeys.has(k))));
  const missingInKa = toSortedArray(new Set([...htmlKeys].filter((k) => !kaKeys.has(k))));
  const missingInHtml = toSortedArray(
    new Set([...new Set([...enKeys, ...kaKeys])].filter((k) => !htmlKeys.has(k)))
  );

  if (missingInEn.length || missingInKa.length) {
    if (missingInEn.length) {
      console.error("Missing English translation keys:");
      missingInEn.forEach((k) => console.error(`  - ${k}`));
    }
    if (missingInKa.length) {
      console.error("Missing Georgian translation keys:");
      missingInKa.forEach((k) => console.error(`  - ${k}`));
    }
    process.exit(1);
  }

  console.log(`Validated ${htmlKeys.size} i18n keys across ${HTML_FILES.length} HTML files.`);
  if (missingInHtml.length) {
    console.log(`Unused translation keys found: ${missingInHtml.length}`);
  }
}

main();
