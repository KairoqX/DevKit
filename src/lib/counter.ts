// Text statistics for the Word & Character Counter.

export const WORDS_PER_MINUTE = 238; // typical adult silent-reading speed; only an estimate

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  paragraphs: number;
}

// Counts characters as people see them, so an emoji counts as 1 rather than 2 or more.
const graphemes =
  typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;

function countCharacters(text: string): number {
  if (text === "") return 0;
  // Very large texts use the faster (slightly less precise) code-point count.
  if (!graphemes || text.length > 1_000_000) return Array.from(text).length;
  let count = 0;
  const iterator = graphemes.segment(text)[Symbol.iterator]();
  while (!iterator.next().done) count++;
  return count;
}

/** Words are whitespace-separated pieces that contain at least one letter or number. */
function countWords(text: string): number {
  let count = 0;
  for (const token of text.split(/\s+/)) {
    if (/[\p{L}\p{N}]/u.test(token)) count++;
  }
  return count;
}

export function getTextStats(text: string): TextStats {
  return {
    words: countWords(text),
    characters: countCharacters(text),
    charactersNoSpaces: countCharacters(text.replace(/\s/g, "")),
    lines: text === "" ? 0 : text.split(/\r\n|\r|\n/).length,
    paragraphs: text.split(/\r?\n\s*\r?\n/).filter((part) => part.trim() !== "").length,
  };
}

export function formatReadingTime(words: number): string {
  if (words === 0) return "0 min";
  const minutes = words / WORDS_PER_MINUTE;
  if (minutes < 1) return `About ${Math.max(1, Math.round(minutes * 60))} sec`;
  return `About ${Math.round(minutes)} min`;
}
