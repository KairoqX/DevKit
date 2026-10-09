import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Contact",
    description: "How to get in touch with Vexiqora about bugs, feedback or suggestions.",
    path: "/contact",
  }),
  // While there is no email address to show, the page has nothing useful for search results.
  ...(siteConfig.contactEmail ? {} : { robots: { index: false, follow: true } }),
};

export default function ContactPage() {
  return (
    <PageShell title="Contact" intro="Found a bug or have a suggestion for a new tool?">
      {siteConfig.contactEmail ? (
        <p>
          Email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. When you report a bug, please say which tool and browser you used. Please don’t send passwords or other sensitive data.
        </p>
      ) : (
        <p>
          Contact details haven’t been set up for this site yet. The site owner can add an email address by setting the <code>NEXT_PUBLIC_CONTACT_EMAIL</code> environment variable.
        </p>
      )}
    </PageShell>
  );
}
