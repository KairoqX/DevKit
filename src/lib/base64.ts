// Base64 with proper UTF-8 support. The browser's built-in btoa/atob only understand
// Latin-1 characters, so we convert text to UTF-8 bytes first (and back again).

export type Base64Result = { ok: true; output: string } | { ok: false; error: string };

export function encodeBase64(text: string, urlSafe = false): string {
  const bytes = new TextEncoder().encode(text);

  // Build the binary string in chunks so very long input doesn't overflow the call stack.
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  const encoded = btoa(binary);
  return urlSafe ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : encoded;
}

export function decodeBase64(input: string): Base64Result {
  // Base64 is often wrapped over several lines, so ignore all whitespace.
  const cleaned = input.replace(/\s+/g, "");
  if (cleaned === "") return { ok: false, error: "Enter some Base64 text to decode." };

  // Accept the URL-safe alphabet (- and _) as well as the standard one (+ and /).
  const standard = cleaned.replace(/-/g, "+").replace(/_/g, "/");
  const body = standard.replace(/={1,2}$/, "");

  const invalid = body.match(/[^A-Za-z0-9+/]/);
  if (invalid) {
    const index = invalid.index ?? 0;
    return {
      ok: false,
      error: `This isn’t valid Base64: found “${invalid[0]}” at character ${index + 1}. Base64 only uses letters, numbers, +, /, and = padding.`,
    };
  }
  if (body.length % 4 === 1) {
    return { ok: false, error: "This isn’t valid Base64: the length is wrong, so some characters may be missing." };
  }

  const padded = body + "=".repeat((4 - (body.length % 4)) % 4);

  let binary: string;
  try {
    binary = atob(padded);
  } catch {
    return { ok: false, error: "This isn’t valid Base64 and could not be decoded." };
  }

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  try {
    return { ok: true, output: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return {
      ok: false,
      error: "The Base64 is valid, but it doesn’t decode to UTF-8 text. It may be a file such as an image.",
    };
  }
}
