# Vexiqora

A free online developer toolbox. Four working tools, all running in the visitor’s browser:

<<<<<<< HEAD
| Tool | URL |
| --- | --- |
| JSON Formatter & Validator | `/tools/json-formatter` |
| Text Diff Checker | `/tools/text-diff` |
| Base64 Encoder & Decoder | `/tools/base64` |
| Word & Character Counter | `/tools/word-counter` |
=======
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
>>>>>>> 8e90e5eab91131a7fd4773f86d40b90ebb97db95

Built with Next.js (App Router), TypeScript and Tailwind CSS. No database, no accounts, no paid APIs, no analytics.

## 1. Install

<<<<<<< HEAD
You need **Node.js 20 or newer** (check with `node -v`; download from https://nodejs.org if needed).

```bash
cd vexiqora
npm install
cp .env.example .env.local
```

## 2. Run it locally

```bash
npm run dev
```

Open http://localhost:3000. Edits you save appear automatically.

## 3. Check it

```bash
npm run test        # unit tests for the tool logic (JSON, diff, Base64, counter)
npm run lint        # code-style and accessibility checks
npm run typecheck   # TypeScript checks
npm run build       # production build, the same one Vercel runs
npm run start       # serve the production build at http://localhost:3000
```

Run `npm run build` before every deploy. If it fails, read the first error message; it names the file and line.

## 4. Environment variables

The production domain, **https://vexiqora.vercel.app**, is already set in `src/lib/site.ts`, so none of these are required. Set them in `.env.local` locally, and in Vercel under **Project → Settings → Environment Variables**.

| Name | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Only needed if the site moves to another domain. Overrides the default for canonical links, Open Graph URLs, `sitemap.xml` and `robots.txt`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Shown on the Contact page, which is then added to the sitemap. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. The code from Google Search Console’s “HTML tag” method (see below). |

`NEXT_PUBLIC_` means the value is visible in the browser. That’s fine here: none are secret. Never put passwords or API keys in a `NEXT_PUBLIC_` variable. Redeploy after changing a variable.

## 5. Deploy to Vercel (free)

1. Create a GitHub account if you don’t have one, then create a new empty repository.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial Vexiqora"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/vexiqora.git
   git push -u origin main
   ```
3. Go to https://vercel.com, sign in with GitHub, choose **Add New → Project**, and import the repository. Vercel detects Next.js; keep the defaults.
4. No environment variables are required. Add `NEXT_PUBLIC_CONTACT_EMAIL` if you want a contact address shown.
5. Select **Deploy**. Every later `git push` redeploys automatically.
6. Make sure the project’s domain is `vexiqora.vercel.app` (**Project → Settings → Domains**). If you later add a custom domain, set `NEXT_PUBLIC_SITE_URL` to it and redeploy.
7. After launch, follow the Search Console steps below.

## Project structure

```
src/
  app/                      Each folder here becomes a URL ("routes").
    layout.tsx              Wraps every page: fonts, navbar, footer, default metadata.
    page.tsx                Homepage (/).
    tools/<name>/page.tsx   One page per tool: sets its SEO metadata and shows the tool.
    about/ privacy/ contact/  Text pages.
    sitemap.ts, robots.ts   Generate /sitemap.xml and /robots.txt.
    not-found.tsx, error.tsx  Friendly 404 and crash screens.
    globals.css             Tailwind setup and the keyboard-focus style.
    favicon.ico, icon.svg, apple-icon.png   Site icons. Next.js links them automatically by filename.
  components/               Reusable pieces of the interface.
    tools/                  The four interactive tools (JsonTool, DiffTool, Base64Tool, CounterTool).
    ToolLayout.tsx          Frame shared by all tool pages: heading, how-to, notes, links.
    ToolBrowser.tsx         Homepage search box and the grouped list of tool cards.
    ThemeToggle.tsx         The light/dark button at the top left of the navbar.
    Button, CopyButton, TextArea, Notice, Navbar, Footer, Logo, ToolCard, PageShell
  lib/                      Plain TypeScript with no screen code, so it's easy to test.
    json.ts diff.ts base64.ts counter.ts   The actual logic of each tool.
    tools.ts                List of tools: names, descriptions, how-to text (one source of truth).
    site.ts                 Site name, description, domain, social image: the single source for all URLs.
    metadata.ts             Builds titles, canonical URLs, Open Graph and Twitter tags.
    examples.ts             The worked example shown on each tool page (checked by tests).
public/og-image.png         Social sharing image (1200 × 630).
design/og-image.svg         Editable source of the social image.
tests/                      lib.test.ts: tool logic. site.test.ts: examples, metadata, asset files.
tailwind.config.ts          Colour names and fonts. The actual colour values (light and dark) are in src/app/globals.css.
next.config.mjs             Next.js settings and basic security headers.
```

## A few concepts, in plain language

- **Component**: a function that returns a piece of the page. `<Button />` is a component. Small components are combined into pages.
- **Props**: the inputs you pass to a component, like arguments to a Python function: `<CopyButton text="hi" label="Copy" />`.
- **Server vs client components**: by default, Next.js components are built ahead of time on the server and sent as plain HTML (fast, good for search engines). A file that starts with `"use client"` also runs in the visitor’s browser, which is needed for anything interactive such as buttons, typing and the clipboard. Vexiqora only marks the interactive files this way.
- **`useState`**: how a component remembers a value (such as the text in a box). When you change it, React redraws the part of the page that uses it.
- **TypeScript types**: labels like `string` or `number` that let the editor catch mistakes before you run the code. `interface Tool { ... }` describes the shape of an object.
- **Tailwind**: styling by adding small classes to elements, such as `px-4` (horizontal padding) or `text-muted`.

## Adding a new tool

1. Add an entry to the `tools` list in `src/lib/tools.ts`.
2. Put its logic in `src/lib/<name>.ts` and add tests in `tests/`.
3. Build its interface in `src/components/tools/<Name>Tool.tsx` (start with `"use client";`).
4. Copy any folder in `src/app/tools/`, rename it to the new slug, and update the names inside.

The homepage, navbar, footer and sitemap update automatically.

## Privacy and monetization notes

- The tools never send input anywhere, and the privacy page describes the current version accurately. **If you add analytics or ads later, update `src/app/privacy/page.tsx` first.**
- The code has no ad or analytics hooks yet, by design. Ethical ad networks or a premium tier can be added later; ad slots should be reserved with fixed heights to avoid layout shift.
- Icons and the social image are files served from your own site. No third-party requests are involved.

## Dark theme

The button at the top left switches themes. The first visit follows your device’s light/dark setting; after you click, your choice is remembered in your browser’s local storage (described on the Privacy page). To change colours, edit the two blocks of variables at the top of `src/app/globals.css` (`:root` for light, `.dark` for dark).

## SEO and indexing: how it's set up

- **One domain setting.** Every canonical URL, Open Graph URL, sitemap entry and the `robots.txt` sitemap line is built from `src/lib/site.ts`, which defaults to `https://vexiqora.vercel.app`.
- **Previews are kept out of search.** Vercel *Preview* deployments (test copies on other addresses) send `noindex` and a `Disallow: /` robots.txt, so they can’t compete with the real site. The Production deployment allows normal crawling.
- **Titles.** Pages use `<Page> — Vexiqora`; the homepage uses `Vexiqora — Free Online Developer Tools`. Change the wording in `src/lib/site.ts` and `src/lib/tools.ts`.
- **Sitemap** lists the homepage, the four tools, About and Privacy. Contact is added only when `NEXT_PUBLIC_CONTACT_EMAIL` is set, because the page has nothing useful until then.
- **Social profiles** are not set. If you want them, add real URLs to `socialProfiles` and your handle to `twitterHandle` in `src/lib/site.ts`.

## After you deploy: Search Console (manual steps)

Because the address ends in `.vercel.app`, you don’t control its DNS, so use a **URL prefix** property (not a Domain property).

1. Open https://search.google.com/search-console and choose **Add property → URL prefix**, then enter `https://vexiqora.vercel.app`.
2. Choose the **HTML tag** verification method. Copy only the `content` value of the tag it shows.
3. In Vercel, add it as the environment variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Production), redeploy, then select **Verify** in Search Console.
4. Under **Sitemaps**, submit `https://vexiqora.vercel.app/sitemap.xml`.
5. Use **URL inspection** on the homepage and each tool page, then **Request indexing**.
6. Check `https://vexiqora.vercel.app/robots.txt` shows `Allow: /`.
7. Indexing and ranking are decided by the search engine and can take days or weeks. Nothing in this project can guarantee them.

## Checking a deployed site by hand

- `/favicon.ico`, `/icon.svg`, `/apple-icon.png` and `/og-image.png` each open an image.
- View the page source of a tool page: the `<title>`, `<link rel="canonical">`, `og:image` and `twitter:card` tags should all use your domain.
- Paste a tool URL into https://www.opengraph.xyz or the Facebook Sharing Debugger / LinkedIn Post Inspector to preview the share card (these services may cache; use their "re-scrape" option after changes).
=======
- The tool logic is tested. The full project has **not yet been built, linted or viewed in a browser** by the author of this README, so run `npm install`, `npm run lint` and `npm run build` before deploying.
- Performance (Core Web Vitals), accessibility scores and social-card previews have not been measured. The design aims for good results, but no figures are claimed.
- No deployment has been performed, and no search-engine indexing or ranking can be promised.
- The contact email and social profiles are not set, because real values haven't been provided.
- The dark theme has been checked in code and tests only; it hasn't been viewed in a browser, so check contrast and appearance on every page.
>>>>>>> 8e90e5eab91131a7fd4773f86d40b90ebb97db95
