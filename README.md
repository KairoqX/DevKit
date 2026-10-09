# Vexiqora

A free online developer toolbox. Four working tools, all running in the visitor’s browser:

| Tool | URL |
| --- | --- |
| JSON Formatter & Validator | `/tools/json-formatter` |
| Text Diff Checker | `/tools/text-diff` |
| Base64 Encoder & Decoder | `/tools/base64` |
| Word & Character Counter | `/tools/word-counter` |

Built with Next.js (App Router), TypeScript and Tailwind CSS. No database, no accounts, no paid APIs, no analytics.

## 1. Install

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
