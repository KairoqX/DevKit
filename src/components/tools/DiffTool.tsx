"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import Button from "../Button";
import Notice from "../Notice";
import TextArea from "../TextArea";
import { diffLines, type DiffLineType, type DiffResult } from "@/lib/diff";

const rowStyle: Record<DiffLineType, string> = {
  added: "bg-added-bg",
  removed: "bg-removed-bg",
  unchanged: "",
};
// The symbol and the hidden label mean colour is never the only signal.
const marker: Record<DiffLineType, { symbol: string; label: string }> = {
  added: { symbol: "+", label: "Added" },
  removed: { symbol: "−", label: "Removed" },
  unchanged: { symbol: "\u00a0", label: "Unchanged" },
};

export default function DiffTool() {
  const [original, setOriginal] = useState("");
  const [changed, setChanged] = useState("");
  const [result, setResult] = useState<DiffResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUnchanged, setShowUnchanged] = useState(true);

  // Editing either box makes an old result out of date, so we hide it.
  function edit(setter: (v: string) => void) {
    return (value: string) => {
      setter(value);
      setResult(null);
      setError(null);
    };
  }

  function compare() {
    setError(null);
    if (original === "" && changed === "") {
      setResult(null);
      setError("Enter text in at least one box to compare.");
      return;
    }
    try {
      setResult(diffLines(original, changed));
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Something went wrong while comparing.");
    }
  }

  function swap() {
    setOriginal(changed);
    setChanged(original);
    setResult(null);
    setError(null);
  }

  function clearAll() {
    setOriginal("");
    setChanged("");
    setResult(null);
    setError(null);
  }

  const visibleLines = result ? result.lines.filter((l) => showUnchanged || l.type !== "unchanged") : [];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <TextArea label="Original text" value={original} onChange={edit(setOriginal)} rows={12} placeholder="Paste the original text" />
        <TextArea label="Changed text" value={changed} onChange={edit(setChanged)} rows={12} placeholder="Paste the changed text" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={compare}>Compare</Button>
        <Button onClick={swap}>
          <ArrowLeftRight size={16} aria-hidden /> Swap
        </Button>
        <Button variant="ghost" onClick={clearAll} disabled={original === "" && changed === "" && !result && !error}>Clear</Button>
      </div>

      {error && <Notice kind="error">{error}</Notice>}

      {result && (
        <section aria-labelledby="diff-heading" className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="diff-heading" className="text-lg font-semibold">Result</h2>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={showUnchanged} onChange={(e) => setShowUnchanged(e.target.checked)} className="h-4 w-4 accent-accent" />
              Show unchanged lines
            </label>
          </div>

          {result.identical ? (
            <Notice kind="success">The two texts are identical.</Notice>
          ) : (
            <p className="text-sm text-muted" role="status">
              {result.added} added, {result.removed} removed, {result.unchanged} unchanged
            </p>
          )}

          {visibleLines.length > 0 && (
            <div className="overflow-x-auto rounded-md border border-line bg-surface">
              <table className="w-full border-collapse font-mono text-sm">
                <caption className="sr-only">Line-by-line comparison</caption>
                <thead className="sr-only">
                  <tr>
                    <th>Original line</th>
                    <th>Changed line</th>
                    <th>Change</th>
                    <th>Text</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLines.map((line, index) => (
                    <tr key={index} className={rowStyle[line.type]}>
                      <td className="w-12 select-none px-2 py-0.5 text-right align-top text-xs text-muted">{line.oldNumber ?? ""}</td>
                      <td className="w-12 select-none px-2 py-0.5 text-right align-top text-xs text-muted">{line.newNumber ?? ""}</td>
                      <td className="w-8 select-none px-2 py-0.5 text-center align-top font-semibold">
                        <span aria-hidden>{marker[line.type].symbol}</span>
                        <span className="sr-only">{marker[line.type].label}</span>
                      </td>
                      <td className="whitespace-pre px-2 py-0.5 align-top">{line.text === "" ? "\u00a0" : line.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
