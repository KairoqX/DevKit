import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { toolPath, tools } from "@/lib/tools";

const linkClass = "text-sm text-muted hover:text-ink";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Free developer tools that run in your browser. No account needed.
          </p>
        </div>
        <nav aria-label="Tools">
          <p className="text-sm font-medium">Tools</p>
          <ul className="mt-3 space-y-2">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link href={toolPath(tool)} className={linkClass}>
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="About Vexiqora">
          <p className="text-sm font-medium">{siteConfig.name}</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/about" className={linkClass}>About</Link></li>
            <li><Link href="/privacy" className={linkClass}>Privacy</Link></li>
            <li><Link href="/contact" className={linkClass}>Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
