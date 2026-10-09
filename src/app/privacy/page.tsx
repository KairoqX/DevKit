import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "How Vexiqora handles your data: tools run in your browser, and this version has no accounts, analytics or ads.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy" intro="A plain-language description of how this version of Vexiqora works.">
      <h2>Your input</h2>
      <p>
        The tools process text in your browser. What you type or paste into a tool isn’t sent to Vexiqora’s servers by the site’s code. When you close or reload the page, it is gone: Vexiqora doesn’t save your input to your browser’s storage either.
      </p>
      <h2>What this version doesn’t include</h2>
      <ul>
        <li>No user accounts and no database.</li>
        <li>No analytics, advertising or tracking scripts.</li>
        <li>No cookies set by Vexiqora’s own code. (The only thing it stores is your theme choice, described below.)</li>
        <li>No requests to third-party font services. Fonts are served from this site.</li>
      </ul>
      <h2>Your theme choice</h2>
      <p>
        If you use the theme button, Vexiqora saves your light or dark choice in your browser’s local storage so the next visit looks the same. It is stored only on your device, is not a cookie, and is not sent to Vexiqora. Clearing your browser data removes it.
      </p>
      <h2>Hosting</h2>
      <p>
        Like most websites, Vexiqora is delivered by a hosting provider. Hosting providers typically keep standard technical logs of requests, such as IP address, the page requested and browser type, for security and operations. Those logs are handled under the host’s own policies, and Vexiqora doesn’t use them to identify visitors.
      </p>
      <h2>Copying to the clipboard</h2>
      <p>The Copy buttons use your browser’s clipboard only when you select them.</p>
      <h2>Limits of this statement</h2>
      <p>
        No website can promise perfect security or privacy. Browser extensions, your device, or your network can still see what you type. Avoid pasting highly sensitive information such as passwords or private keys into any website, including this one.
      </p>
      <h2>Changes</h2>
      <p>
        If Vexiqora adds analytics, advertising or accounts in the future, this page will be updated before they are used. Last updated: October 2026.
      </p>
    </PageShell>
  );
}
