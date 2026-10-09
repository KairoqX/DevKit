import { Binary, Braces, GitCompare, Type, type LucideIcon } from "lucide-react";

export type ToolCategory = "Encoding & data" | "Text";

export interface Tool {
  slug: string;
  name: string;
  /** Short label for the navigation bar. */
  shortName: string;
  category: ToolCategory;
  icon: LucideIcon;
  /** Short line shown on the tool card and under the page heading. */
  summary: string;
  /** Page title (the site name is added automatically). */
  seoTitle: string;
  seoDescription: string;
  /** Longer explanation shown below the tool. */
  about: string;
  howTo: string[];
  goodToKnow: string[];
}

export const categoryOrder: ToolCategory[] = ["Encoding & data", "Text"];

// To add a tool: add an entry here and create its page in src/app/tools/<slug>/page.tsx.
// The homepage, navigation, footer and sitemap pick it up automatically.
export const tools: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    shortName: "JSON",
    category: "Encoding & data",
    icon: Braces,
    summary: "Pretty-print, minify and validate JSON, with clear error locations.",
    seoTitle: "JSON Formatter & Validator",
    seoDescription:
      "Format, minify and validate JSON online. See exactly where a syntax error is. Runs in your browser, so your data isn’t uploaded.",
    about:
      "JSON is the text format most web APIs and config files use. This tool reads your JSON, checks that it is valid, and rewrites it either with neat indentation (easier for people to read) or with all extra whitespace removed (smaller to send over a network).",
    howTo: [
      "Paste your JSON into the input box.",
      "Choose Format to indent it, Minify to remove whitespace, or Validate to only check it.",
      "Fix any error shown, using the line and column as a guide, then copy the result.",
    ],
    goodToKnow: [
      "Your JSON is parsed as data and never run as code.",
      "Browsers read JSON numbers as floating-point values, so integers larger than 9,007,199,254,740,991 can lose precision.",
      "Error wording and positions come from your browser, so they can differ slightly between Chrome, Firefox and Safari.",
    ],
  },
  {
    slug: "text-diff",
    name: "Text Diff Checker",
    shortName: "Text diff",
    category: "Text",
    icon: GitCompare,
    summary: "Compare two texts and see added, removed and unchanged lines.",
    seoTitle: "Text Diff Checker",
    seoDescription:
      "Compare two pieces of text line by line and see what was added, removed or left unchanged. Runs in your browser.",
    about:
      "A diff shows the differences between two versions of a text. This tool compares the two boxes line by line, then lists every line as added, removed or unchanged, with line numbers from both versions.",
    howTo: [
      "Paste the original text on the left and the changed text on the right.",
      "Select Compare.",
      "Read the result: lines marked + were added, lines marked − were removed. Use Swap to compare in the other direction.",
    ],
    goodToKnow: [
      "The comparison works on whole lines. If one word changes, the whole line shows as removed and re-added.",
      "Line endings (Windows or Unix) and one final newline are ignored.",
      "Very large texts are refused with a message rather than freezing your browser.",
    ],
  },
  {
    slug: "base64",
    name: "Base64 Encoder & Decoder",
    shortName: "Base64",
    category: "Encoding & data",
    icon: Binary,
    summary: "Encode text to Base64 or decode it back, including emoji and non-English text.",
    seoTitle: "Base64 Encoder & Decoder",
    seoDescription:
      "Encode text to Base64 or decode Base64 to text online, with full UTF-8 support for emoji and non-English characters. Runs in your browser.",
    about:
      "Base64 represents data using only letters, numbers and a few symbols, so it can travel safely through systems built for plain text, such as email and URLs. It is an encoding, not encryption: anyone can decode it.",
    howTo: [
      "Choose Encode (text to Base64) or Decode (Base64 to text).",
      "Type or paste your input. The result updates as you type.",
      "Copy the output, or use “Use output as input” to run it back the other way.",
    ],
    goodToKnow: [
      "Base64 is not a way to keep secrets. Don’t use it to protect passwords or private data.",
      "Decoding accepts both the standard alphabet and the URL-safe alphabet, with or without = padding.",
      "Only text is supported. Base64 that decodes to a file, such as an image, is reported as an error.",
    ],
  },
  {
    slug: "word-counter",
    name: "Word & Character Counter",
    shortName: "Word counter",
    category: "Text",
    icon: Type,
    summary: "Count words, characters, lines and paragraphs as you type.",
    seoTitle: "Word & Character Counter",
    seoDescription:
      "Count words, characters with and without spaces, lines and paragraphs, and get a reading-time estimate. Updates live in your browser.",
    about:
      "Paste or type text to see its length measured several ways. The numbers update as you type, which helps with limits such as meta descriptions, social posts or essay requirements.",
    howTo: [
      "Type or paste your text into the box.",
      "Read the counts, which update immediately.",
      "Use Copy text or Copy stats to take the result with you.",
    ],
    goodToKnow: [
      "Words are separated by spaces or line breaks. Languages written without spaces, such as Chinese and Japanese, are better measured by character count.",
      "Characters are counted as you see them, so an emoji counts as one.",
      "Reading time is an estimate based on about 238 words per minute. Real reading speed varies.",
    ],
  },
];

export function getTool(slug: string): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export const toolPath = (tool: Tool) => `/tools/${tool.slug}`;
