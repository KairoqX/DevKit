import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "How DevKit handles your data: tools run in your browser, and this version has no accounts, analytics or ads.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy" intro="A plain-language description of how this version of DevKit works.">
      <h2>Your input</h2>
      <p>
        The tools process text in your browser. What you type or paste into a tool isn’t sent to DevKit’s servers by the site’s code. When you close or reload the page, it is gone: DevKit doesn’t save it to your browser’s storage either.
      </p>
      <h2>What this version doesn’t include</h2>
      <ul>
        <li>No user accounts and no database.</li>
        <li>No analytics, advertising or tracking scripts.</li>
        <li>No cookies set by DevKit’s own code.</li>
        <li>No requests to third-party font services. Fonts are served from this site.</li>
      </ul>
      <h2>Hosting</h2>
      <p>
        Like most websites, DevKit is delivered by a hosting provider. Hosting providers typically keep standard technical logs of requests, such as IP address, the page requested and browser type, for security and operations. Those logs are handled under the host’s own policies, and DevKit doesn’t use them to identify visitors.
      </p>
      <h2>Copying to the clipboard</h2>
      <p>The Copy buttons use your browser’s clipboard only when you select them.</p>
      <h2>Limits of this statement</h2>
      <p>
        No website can promise perfect security or privacy. Browser extensions, your device, or your network can still see what you type. Avoid pasting highly sensitive information such as passwords or private keys into any website, including this one.
      </p>
      <h2>Changes</h2>
      <p>
        If DevKit adds analytics, advertising or accounts in the future, this page will be updated before they are used. Last updated: October 2026.
      </p>
    </PageShell>
  );
}
