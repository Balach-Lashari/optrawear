// Fails if tokens.json, tokens.css and tokens.ts disagree on colours, type styles or radii,
// and reports WCAG contrast for the text pairs the style guide relies on.
import { readFileSync } from "node:fs";

const dir = new URL("../docs/design/tokens/", import.meta.url);
const json = JSON.parse(readFileSync(new URL("tokens.json", dir), "utf8"));
const css = readFileSync(new URL("tokens.css", dir), "utf8");
const ts = readFileSync(new URL("tokens.ts", dir), "utf8");

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const problems = [];

for (const [name, token] of Object.entries(json.color)) {
  if (name.startsWith("$")) continue;
  const hex = token.$value.toLowerCase();
  const cssHex = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1]?.toLowerCase();
  const tsHex = ts.match(new RegExp(`\\b${camel(name)}:\\s*"(#[0-9a-f]{6})"`, "i"))?.[1]?.toLowerCase();
  if (cssHex !== hex) problems.push(`color.${name}: json ${hex} ≠ css ${cssHex}`);
  if (tsHex !== hex) problems.push(`color.${name}: json ${hex} ≠ ts ${tsHex}`);
}

for (const [name, token] of Object.entries(json.text)) {
  const px = parseFloat(token.size.$value);
  const rem = css.match(new RegExp(`--text-${name}:\\s*([\\d.]+)rem`))?.[1];
  const tsStyle = ts.match(new RegExp(`\\b${camel(name)}:\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  const tsPx = tsStyle.match(/size:\s*(\d+)/)?.[1];
  if (!rem || Math.abs(parseFloat(rem) * 16 - px) > 0.01) problems.push(`text.${name}: json ${px}px ≠ css ${rem}rem`);
  if (Number(tsPx) !== px) problems.push(`text.${name}: json ${px}px ≠ ts ${tsPx}px`);

  const cssLineHeight = css.match(new RegExp(`--text-${name}--line-height:\\s*([\\d.]+)`))?.[1];
  const tsLineHeight = tsStyle.match(/lineHeight:\s*([\d.]+)/)?.[1];
  if (Number(cssLineHeight) !== token.lineHeight) problems.push(`text.${name}.lineHeight: json ${token.lineHeight} ≠ css ${cssLineHeight}`);
  if (Number(tsLineHeight) !== token.lineHeight) problems.push(`text.${name}.lineHeight: json ${token.lineHeight} ≠ ts ${tsLineHeight}`);

  // Letter spacing is optional; when any file sets it, all three must agree.
  const cssTracking = css.match(new RegExp(`--text-${name}--letter-spacing:\\s*(-?[\\d.]+em)`))?.[1];
  const tsTracking = tsStyle.match(/letterSpacing:\s*"(-?[\d.]+em)"/)?.[1];
  if (cssTracking !== token.letterSpacing) problems.push(`text.${name}.letterSpacing: json ${token.letterSpacing} ≠ css ${cssTracking}`);
  if (tsTracking !== token.letterSpacing) problems.push(`text.${name}.letterSpacing: json ${token.letterSpacing} ≠ ts ${tsTracking}`);
}

const tsRadius = ts.match(/\bradius\s*=\s*\{([^}]*)\}/)?.[1] ?? "";
for (const [name, token] of Object.entries(json.radius)) {
  if (name.startsWith("$")) continue;
  const px = parseFloat(token.$value);
  const cssPx = css.match(new RegExp(`--radius-${name}:\\s*([\\d.]+)px`))?.[1];
  const tsPx = tsRadius.match(new RegExp(`\\b${camel(name)}:\\s*([\\d.]+)`))?.[1];
  if (Number(cssPx) !== px) problems.push(`radius.${name}: json ${px}px ≠ css ${cssPx}px`);
  if (Number(tsPx) !== px) problems.push(`radius.${name}: json ${px}px ≠ ts ${tsPx}px`);
}

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const c = (n) => json.color[n].$value;
const pairs = [
  ["ink", "cream", 4.5],
  ["ink-soft", "cream", 4.5],
  ["ink-muted", "cream", 4.5],
  ["ink-muted", "cream-sunken", 4.5],
  ["ink-soft", "cream-tint", 4.5],
  ["ink-faint", "cream", 4.5],
  ["cream", "slate", 4.5],
  ["cream", "ink", 4.5],
  ["danger", "cream", 4.5],
];
for (const [fg, bg, min] of pairs) {
  const r = ratio(c(fg), c(bg));
  console.log(`${r >= min ? "✓" : "✗"} ${fg} on ${bg}: ${r.toFixed(2)} (min ${min})`);
  if (r < min) problems.push(`contrast ${fg} on ${bg} is ${r.toFixed(2)}`);
}

if (problems.length) {
  console.error("\nToken check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`\nTokens in sync: ${Object.keys(json.color).filter((k) => !k.startsWith("$")).length} colours, ${Object.keys(json.text).length} text styles, ${Object.keys(json.radius).filter((k) => !k.startsWith("$")).length} radii.`);
