import Link from "next/link";
import Logo from "./Logo";
import { toolPath, tools } from "@/lib/tools";

const linkClass = "rounded-md px-2.5 py-2 text-sm text-muted hover:text-ink";

export default function Navbar() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="flex items-center gap-0.5">
          {/* The individual tool links appear on wider screens; phones get the shorter menu. */}
          {tools.map((tool) => (
            <Link key={tool.slug} href={toolPath(tool)} className={`${linkClass} hidden xl:block`}>
              {tool.shortName}
            </Link>
          ))}
          <Link href="/#tools" className={linkClass}>
            All tools
          </Link>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
