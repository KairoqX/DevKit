import type { ReactNode } from "react";

// Simple frame for text pages (About, Privacy, Contact).
export default function PageShell({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
      <div className="mt-8 space-y-4 leading-relaxed [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_a]:font-medium [&_a]:text-accent-text [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </div>
  );
}
