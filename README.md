# Vexiqora

**Free online developer tools for formatting JSON, comparing text, encoding Base64, and counting words.**

Vexiqora is a small, fast toolbox that runs entirely in your browser. There are no accounts, no database and no paid services. What you paste into a tool is processed on your own device and is not uploaded by the site's code.

Live at **https://vexiqora.vercel.app** once deployed.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Designed to deploy on Vercel's free tier.

---

## The tools

Every tool has its own shareable URL, its own page title and description, a step-by-step "How to use" section, a worked example, and notes on its limits.

### JSON Formatter & Validator: `/tools/json-formatter`

- **Format** (pretty-print) with 2 spaces, 4 spaces or tabs
- **Minify** to remove all extra whitespace
- **Validate** without changing your text, with a summary of the top-level value (for example, "an object with 3 keys")
- **Error messages with location:** line and column are shown when your browser provides them
- Friendly message for empty input; a leading byte-order mark (added by some editors) is ignored
- Copy output and Clear buttons
- JSON is parsed as data and never executed as code

*Good to know:* browsers read JSON numbers as floating-point, so integers above 9,007,199,254,740,991 can lose precision.

### Text Diff Checker: `/tools/text-diff`

- Two input boxes: original and changed text
- Line-by-line result showing **added**, **removed** and **unchanged** lines, with line numbers from both versions
- Each line is marked with `+` or `−` as well as colour, so the result doesn't depend on colour alone
- Summary counts (added / removed / unchanged), a "The two texts are identical" confirmation, and a toggle to hide unchanged lines
- Swap and Clear buttons
- Windows and Unix line endings, and a single final newline, are ignored so they don't create false differences
- Very large comparisons are refused with a clear message instead of freezing your browser

*Good to know:* the comparison works on whole lines, so one changed word shows as a removed line and an added line.

### Base64 Encoder & Decoder: `/tools/base64`

- Separate **Encode** and **Decode** modes; results update **as you type**
- Full **UTF-8 support**: emoji and non-English text (for example Japanese, Arabic, Hindi) round-trip correctly
- Optional **URL-safe** output when encoding
- Decoding accepts both the standard and URL-safe alphabets, extra whitespace and line breaks, and missing `=` padding
- Specific errors for invalid input, such as which character is not allowed and where, instead of a crash
- Detects Base64 that decodes to a file (such as an image) rather than text, and says so
- "Use output as input" swaps direction in one click; Copy and Clear buttons

*Good to know:* Base64 is an encoding, not encryption. Don't use it to protect secrets.

### Word & Character Counter: `/tools/word-counter`

- Live **words**, **characters**, **characters without spaces**, **lines** and **paragraphs**
- **Reading-time estimate**, clearly labelled as an estimate and based on about 238 words per minute
- Characters are counted as people see them, so an emoji counts as 1
- Copy text, Copy stats and Clear buttons

*Good to know:* words are separated by spaces and line breaks, so Chinese and Japanese text is better measured by character count.

---

## The website

- Clean, minimal interface: charcoal text, one restrained green accent, IBM Plex fonts, no decorative animation
- **Light and dark themes** with a toggle button at the top left of the navbar. The first visit follows your device setting, your choice is remembered in this browser, and the right theme is applied before the page is drawn to avoid a flash. Colours are defined once as variables in `src/app/globals.css`, and a test checks both themes define every colour.
- **Homepage** with a hero, a **live search** that filters tools, tool cards grouped by category, and an empty state with a "Clear search" button
- Responsive **navbar** (theme button and logo at the left; the logo links home) and **footer** with About, Privacy and Contact links
- **About**, **Privacy** and **Contact** pages, plus a friendly 404 page and an error screen for unexpected problems
- Breadcrumbs, "More tools" links and consistent headings on every tool page
- Loading-free by design: the tools respond instantly because there is no network step

---

## Privacy

- Tool input is processed in the browser. The site's code does not send it anywhere.
- No accounts, database, analytics, advertising scripts or cookies set by Vexiqora's own code. The only thing stored in your browser is your light/dark choice (local storage, never sent anywhere), and the Privacy page says so
- Fonts are served from the site itself, so visitors' browsers don't contact a font service
- The Privacy page describes exactly this, and notes that the hosting provider may keep standard request logs
- No claims of perfect security or privacy are made

---

## Search and sharing

- Unique page title and description for the homepage and every tool (`JSON Formatter & Validator — Vexiqora`)
- Canonical URLs, Open Graph and Twitter/X large-image cards, all built from **one** configurable domain
- Generated `sitemap.xml` (homepage, tools, About, Privacy; Contact only once an email is configured) and `robots.txt`
- Structured data describing each tool as a free web application, with no ratings or reviews
- The domain **https://vexiqora.vercel.app** is the default for all canonical URLs, sitemap entries and `robots.txt`
- **Preview protection:** Vercel preview deployments (test copies) ask search engines not to index them
- Optional Google Search Console verification through an environment variable
- Icon set: `favicon.ico` (16/32/48 px), `icon.svg` and an Apple touch icon, plus a 1200 × 630 social sharing image

---

## Accessibility

- Skip-to-content link and visible keyboard focus rings
- Every input has a real label; errors are announced to screen readers
- Copy confirmations are announced; the Base64 mode switch is a native radio group
- Diff results are a proper table with hidden headings, and long example blocks are keyboard-scrollable
- Placeholder text and muted text are chosen for readable contrast

---

## For developers

- **One place for settings:** `src/lib/site.ts` holds the name, description, domain, social image, optional contact email and social profiles
- **One list of tools:** `src/lib/tools.ts` drives the homepage, navbar, footer, sitemap and tool pages
- Tool logic lives in plain TypeScript (`src/lib/json.ts`, `diff.ts`, `base64.ts`, `counter.ts`), separate from the screens
- **42 automated tests** cover the tool logic, check that the on-page examples match real tool output, verify metadata is consistent, and confirm the icon and social image files exist with the right sizes
- Client-side JavaScript is limited to the interactive parts; the pages themselves are generated ahead of time
- Only four runtime dependencies: Next.js, React, React DOM and Lucide icons

### Adding a tool

1. Add an entry to `src/lib/tools.ts`
2. Put its logic in `src/lib/<name>.ts` and add tests
3. Build its interface in `src/components/tools/<Name>Tool.tsx`
4. Copy a folder in `src/app/tools/` and rename it to the new URL

### Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional; only needed if the site moves from `https://vexiqora.vercel.app` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional; shown on the Contact page and adds it to the sitemap |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional; the code from Search Console's "HTML tag" method |

---

## Current status and limits

- The tool logic is tested. The full project has **not yet been built, linted or viewed in a browser** by the author of this README, so run `npm install`, `npm run lint` and `npm run build` before deploying.
- Performance (Core Web Vitals), accessibility scores and social-card previews have not been measured. The design aims for good results, but no figures are claimed.
- No deployment has been performed, and no search-engine indexing or ranking can be promised.
- The contact email and social profiles are not set, because real values haven't been provided.
- The dark theme has been checked in code and tests only; it hasn't been viewed in a browser, so check contrast and appearance on every page.
