"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ToolCard from "./ToolCard";
import Button from "./Button";
import { categoryOrder, tools } from "@/lib/tools";

// "Encoding & data" -> "encoding-data": ids can't contain spaces or symbols.
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// The search box and the tool list live together because the list depends on what is typed.
// `useState` is how React remembers a value (here, the search text) between renders.
export default function ToolBrowser() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const matches = tools.filter((tool) =>
    needle === "" ? true : `${tool.name} ${tool.summary} ${tool.category}`.toLowerCase().includes(needle),
  );

  return (
    <div id="tools" className="scroll-mt-6">
      <div className="relative max-w-xl">
        <label htmlFor="tool-search" className="sr-only">
          Search tools
        </label>
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id="tool-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools, for example “json” or “count”"
          autoComplete="off"
          className="h-12 w-full rounded-md border border-line bg-surface pl-10 pr-3 text-base text-ink placeholder:text-muted"
        />
      </div>
      <p className="mt-2 text-sm text-muted" role="status">
        {needle === "" ? `${tools.length} tools` : `${matches.length} of ${tools.length} tools`}
      </p>

      {matches.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-line bg-surface p-8 text-center">
          <p className="font-medium">No tools match “{query.trim()}”.</p>
          <p className="mt-1 text-sm text-muted">Try a shorter word, or clear the search to see every tool.</p>
          <Button className="mt-4" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {categoryOrder.map((category) => {
            const inCategory = matches.filter((tool) => tool.category === category);
            if (inCategory.length === 0) return null;
            return (
              <section key={category} aria-labelledby={`category-${slugify(category)}`}>
                <h2 id={`category-${slugify(category)}`} className="text-sm font-semibold text-muted">
                  {category}
                </h2>
                <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                  {inCategory.map((tool) => (
                    <li key={tool.slug}>
                      <ToolCard tool={tool} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
