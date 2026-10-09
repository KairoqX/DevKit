import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { examples } from "../src/lib/examples";
import { formatJson } from "../src/lib/json";
import { diffLines } from "../src/lib/diff";
import { encodeBase64, decodeBase64 } from "../src/lib/base64";
import { formatReadingTime, getTextStats } from "../src/lib/counter";
import { absoluteUrl, siteConfig } from "../src/lib/site";
import { buildMetadata, pageTitle } from "../src/lib/metadata";

const root = path.resolve(__dirname, "..");

// ---------- the examples shown on tool pages are produced by the real tool logic ----------
test("example: JSON formatter output is exactly what the tool produces", () => {
  const r = formatJson(examples["json-formatter"].input, "2");
  assert.ok(r.ok);
  assert.equal(r.output, examples["json-formatter"].output);
});

test("example: text diff output is exactly what the tool produces", () => {
  const [oldPart, newPart] = examples["text-diff"].input.replace("Original:\n", "").split("\n\nChanged:\n");
  const symbol = { added: "+ ", removed: "− ", unchanged: "  " } as const;
  const out = diffLines(oldPart, newPart).lines.map((l) => symbol[l.type] + l.text).join("\n");
  assert.equal(out, examples["text-diff"].output);
});

test("example: Base64 output is exactly what the tool produces and decodes back", () => {
  const { input, output } = examples.base64;
  assert.equal(encodeBase64(input), output);
  const back = decodeBase64(output);
  assert.ok(back.ok && back.output === input);
});

test("example: word counter output is exactly what the tool produces", () => {
  const { input, output } = examples["word-counter"];
  const s = getTextStats(input);
  const lines = [
    `Words: ${s.words}`,
    `Characters: ${s.characters}`,
    `Characters (no spaces): ${s.charactersNoSpaces}`,
    `Lines: ${s.lines}`,
    `Paragraphs: ${s.paragraphs}`,
    `Reading time (estimate): ${formatReadingTime(s.words)}`,
  ];
  assert.equal(lines.join("\n"), output);
});

// ---------- configuration and metadata ----------
test("site config: description and title match the agreed wording", () => {
  assert.equal(
    siteConfig.description,
    "Free online developer tools for formatting JSON, comparing text, encoding Base64, and counting words.",
  );
  assert.equal(siteConfig.homeTitle, "Vexiqora — Free Online Developer Tools");
});

test("site config: production domain is vexiqora.vercel.app unless overridden", () => {
  if (!process.env.NEXT_PUBLIC_SITE_URL) assert.equal(siteConfig.url, "https://vexiqora.vercel.app");
  assert.equal(siteConfig.name, "Vexiqora");
});

test("theme: every colour token exists in both the light and dark theme", () => {
  const config = fs.readFileSync(path.join(root, "tailwind.config.ts"), "utf8");
  const css = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");
  const tokens = [...config.matchAll(/token\("([a-z-]+)"\)/g)].map((m) => m[1]);
  assert.ok(tokens.length >= 13);
  const light = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
  const dark = css.slice(css.indexOf(".dark"), css.indexOf("@layer base"));
  for (const t of tokens) {
    assert.match(light, new RegExp(`--${t}:\\s*\\d+ \\d+ \\d+;`), `light theme is missing --${t}`);
    assert.match(dark, new RegExp(`--${t}:\\s*\\d+ \\d+ \\d+;`), `dark theme is missing --${t}`);
  }
});

test("theme: the toggle is wired into the navbar and the layout", () => {
  assert.match(fs.readFileSync(path.join(root, "src/components/Navbar.tsx"), "utf8"), /<ThemeToggle \/>/);
  assert.match(fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8"), /themeScript/);
  assert.match(fs.readFileSync(path.join(root, "tailwind.config.ts"), "utf8"), /darkMode: "class"/);
});

test("site config: URLs come from one place and have no trailing slash", () => {
  assert.doesNotMatch(siteConfig.url, /\/$/);
  assert.equal(absoluteUrl("/"), `${siteConfig.url}/`);
  assert.equal(absoluteUrl("/tools/base64"), `${siteConfig.url}/tools/base64`);
});

test("metadata: titles follow '<page> — Vexiqora', and the homepage has its own title", () => {
  assert.equal(pageTitle("Text Diff Checker", "/tools/text-diff"), "Text Diff Checker — Vexiqora");
  assert.equal(pageTitle("ignored", "/"), "Vexiqora — Free Online Developer Tools");
});

test("metadata: canonical, Open Graph and Twitter agree and use an existing image", () => {
  const m = buildMetadata({ title: "Base64 Encoder & Decoder", description: "d", path: "/tools/base64" });
  assert.equal(m.alternates?.canonical, "/tools/base64");
  const og = m.openGraph as { url: string; title: string; images: { url: string; width: number; height: number }[] };
  assert.equal(og.url, "/tools/base64");
  assert.equal(og.title, "Base64 Encoder & Decoder — Vexiqora");
  assert.equal((m.twitter as { card: string }).card, "summary_large_image");
  assert.ok(fs.existsSync(path.join(root, "public", og.images[0].url)));
});

// ---------- assets referenced by the site actually exist, with correct sizes ----------
function pngSize(file: string) {
  const buf = fs.readFileSync(file);
  assert.equal(buf.subarray(1, 4).toString(), "PNG", `${file} is not a PNG`);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test("assets: social image is a 1200x630 PNG matching the config", () => {
  const size = pngSize(path.join(root, "public", siteConfig.ogImage.path));
  assert.deepEqual(size, { width: siteConfig.ogImage.width, height: siteConfig.ogImage.height });
  assert.deepEqual(size, { width: 1200, height: 630 });
});

test("assets: apple-icon.png is 180x180", () => {
  assert.deepEqual(pngSize(path.join(root, "src/app/apple-icon.png")), { width: 180, height: 180 });
});

test("assets: favicon.ico is a valid ICO containing 16, 32 and 48 px images", () => {
  const buf = fs.readFileSync(path.join(root, "src/app/favicon.ico"));
  assert.equal(buf.readUInt16LE(0), 0);
  assert.equal(buf.readUInt16LE(2), 1); // 1 = icon
  const count = buf.readUInt16LE(4);
  const sizes = Array.from({ length: count }, (_, i) => buf.readUInt8(6 + 16 * i)).sort((a, b) => a - b);
  assert.deepEqual(sizes, [16, 32, 48]);
  for (let i = 0; i < count; i++) {
    const length = buf.readUInt32LE(6 + 16 * i + 8);
    const offset = buf.readUInt32LE(6 + 16 * i + 12);
    assert.ok(offset + length <= buf.length, "image data lies inside the file");
    assert.equal(buf.subarray(offset + 1, offset + 4).toString(), "PNG");
  }
});

test("assets: icon.svg is a valid SVG with a viewBox", () => {
  const svg = fs.readFileSync(path.join(root, "src/app/icon.svg"), "utf8");
  assert.match(svg, /^<svg[^>]+viewBox="0 0 32 32"/);
});

test("assets: no static robots.txt or sitemap.xml that would conflict with the generated ones", () => {
  for (const f of ["public/robots.txt", "public/sitemap.xml", "src/app/robots.txt", "src/app/sitemap.xml"]) {
    assert.equal(fs.existsSync(path.join(root, f)), false, `${f} would conflict`);
  }
});

test("routes: every tool in the registry has a page file", () => {
  const registry = fs.readFileSync(path.join(root, "src/lib/tools.ts"), "utf8");
  const slugs = [...registry.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  assert.equal(slugs.length, 4);
  for (const slug of slugs) {
    assert.ok(fs.existsSync(path.join(root, "src/app/tools", slug, "page.tsx")), `missing page for ${slug}`);
    assert.ok(examples[slug], `missing example for ${slug}`);
  }
});
