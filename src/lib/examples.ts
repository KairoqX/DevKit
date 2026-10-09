// One worked example per tool, shown on each tool's page.
// tests/lib.test.ts runs the real tool logic on every example, so these can't drift from reality.

export interface ToolExample {
  description: string;
  inputLabel: string;
  input: string;
  outputLabel: string;
  output: string;
}

export const examples: Record<string, ToolExample> = {
  "json-formatter": {
    description:
      "Paste compact JSON, choose Format with 2 spaces of indent, and it becomes easy to read. A common mistake is a trailing comma, as in {\"a\": 1,}. Validate points to where the parser stopped.",
    inputLabel: "Input",
    input: '{"name":"Vexiqora","free":true,"tools":["json","diff","base64"]}',
    outputLabel: "Formatted output",
    output: '{\n  "name": "Vexiqora",\n  "free": true,\n  "tools": [\n    "json",\n    "diff",\n    "base64"\n  ]\n}',
  },
  "text-diff": {
    description:
      "Compare a short list before and after an edit. “banana” was replaced, and “date” was added at the end. Lines marked − were removed, and lines marked + were added.",
    inputLabel: "Input",
    input: "Original:\napple\nbanana\ncherry\n\nChanged:\napple\nblueberry\ncherry\ndate",
    outputLabel: "Result",
    output: "  apple\n− banana\n+ blueberry\n  cherry\n+ date",
  },
  base64: {
    description:
      "Encoding turns text, including emoji, into Base64. Switch to Decode and paste the output back in to get the original text.",
    inputLabel: "Text to encode",
    input: "Hello, Vexiqora! 👋",
    outputLabel: "Base64 output",
    output: "SGVsbG8sIFZleGlxb3JhISDwn5GL",
  },
  "word-counter": {
    description: "Paste or type two short sentences and the counts appear straight away.",
    inputLabel: "Your text",
    input: "Vexiqora runs in your browser.\nNothing you paste is uploaded.",
    outputLabel: "Counts",
    output:
      "Words: 10\nCharacters: 61\nCharacters (no spaces): 52\nLines: 2\nParagraphs: 1\nReading time (estimate): About 3 sec",
  },
};
