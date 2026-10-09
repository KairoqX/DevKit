import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md font-semibold tracking-tight text-ink" aria-label={`${siteConfig.name} home`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#1d6b57" />
        <path d="M13 9 6 16l7 7M19 9l7 7-7 7" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-lg">{siteConfig.name}</span>
    </Link>
  );
}
