// Fortune in a Pot — make.fun entry (program/v1).
//
// Writes one kind, funny fortune for a houseplant to /output/entry.txt.
// The fortune is embedded in this file: no external assets, no network
// access, and no dependence on the working directory, so the program
// writes the same bytes no matter where the grader runs it from.

import { mkdirSync, writeFileSync } from "node:fs";

// The fortune: a dated prediction for the plant on the windowsill —
// sun, leaves, keeper, and the punchline that the window's best view
// is not outside the glass at all, it grows in a pot.
const FORTUNE =
  "By Friday your leaves will glow in the sun, and your keeper will tell guests the window's best view grows in a pot.";

// The gate path is absolute by the competition spec: the sealed scorer
// reads /output/entry.txt. Resolve nothing from the working directory.
const OUTPUT_PATH = "/output/entry.txt";

// Gate self-check: UTF-8 text, 1..120 characters, a single line, and
// not only white space. Count Unicode code points (not UTF-16 units),
// the way a character gate reads the text; the entry is pure ASCII,
// so both counts agree here.
const length = [...FORTUNE].length;
if (length < 1 || length > 120) {
  throw new Error(`fortune is ${length} characters, must be 1..120`);
}
if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
  throw new Error("fortune must be a single line");
}
if (FORTUNE.trim().length === 0) {
  throw new Error("fortune must not be only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, FORTUNE, "utf8");
console.log(`Wrote ${length} characters to ${OUTPUT_PATH}`);
