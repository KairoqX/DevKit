import Link from "next/link";
import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "DevKit is a free set of developer tools that run in your browser. Learn what it offers and how it is built.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell title="About DevKit" intro="A small, free toolbox for everyday developer tasks.">
      <p>
        DevKit collects simple tools that people often need while coding or writing: formatting JSON, comparing two pieces of text, encoding Base64 and counting words. Each tool has its own page, so you can bookmark the ones you use.
      </p>
      <h2>How it’s built</h2>
      <p>
        DevKit is a Next.js website. The tools run as JavaScript in your browser, which is why they are fast and why your input isn’t sent to a server. The pages are generated ahead of time, so hosting costs very little.
      </p>
      <h2>What’s included today</h2>
      <ul>
        <li><Link href="/tools/json-formatter">JSON Formatter &amp; Validator</Link></li>
        <li><Link href="/tools/text-diff">Text Diff Checker</Link></li>
        <li><Link href="/tools/base64">Base64 Encoder &amp; Decoder</Link></li>
        <li><Link href="/tools/word-counter">Word &amp; Character Counter</Link></li>
      </ul>
      <p>
        Questions or ideas? See the <Link href="/contact">contact page</Link>. To understand how your data is handled, read the <Link href="/privacy">privacy page</Link>.
      </p>
    </PageShell>
  );
}
