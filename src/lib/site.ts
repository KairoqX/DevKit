// The one place that holds site-wide settings.
// To set your real domain, use the NEXT_PUBLIC_SITE_URL environment variable (see .env.example).
// No code edits are needed.

// A clearly fake address, used only until you provide your real domain.
const PLACEHOLDER_URL = "https://devkit.example.com";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "DevKit",
  tagline: "Free Online Developer Tools",
  // Title of the homepage. Other pages use "<Page title> — DevKit".
  homeTitle: "DevKit — Free Online Developer Tools",
  titleSeparator: " — ",
  description:
    "Free online developer tools for formatting JSON, comparing text, encoding Base64, and counting words.",

  // Production URL, without a trailing slash. Everything else is built from this.
  url: (configuredUrl || PLACEHOLDER_URL).replace(/\/+$/, ""),
  // True until NEXT_PUBLIC_SITE_URL is set.
  isPlaceholderUrl: !configuredUrl,

  // Only fill these in with real values. Nothing is shown or output while they are empty.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  socialProfiles: [] as string[], // for example: ["https://github.com/your-name/devkit"]
  twitterHandle: "", // for example: "@yourhandle"

  // The social-sharing image lives in /public.
  ogImage: {
    path: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "DevKit: free online developer tools that run in your browser",
  },
};

/** Builds a full URL from a path such as "/tools/base64". */
export function absoluteUrl(path = "/"): string {
  // The homepage keeps its trailing slash so it matches the canonical URL Next.js generates.
  return `${siteConfig.url}${path}`;
}

/**
 * Whether search engines should be allowed to index this deployment.
 * Off until a real domain is configured, and off for Vercel preview deployments,
 * so test copies of the site never compete with the real one.
 */
export const isIndexable = !siteConfig.isPlaceholderUrl && process.env.VERCEL_ENV !== "preview";
