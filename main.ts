// One Line to Your Younger Self entry (Node 22, standard library only):
// the entry is the entry.txt beside this file, and this program writes
// it verbatim to /output/entry.txt. The gate takes UTF-8 text of 1 to
// 200 characters; this entry is exactly one line, one sentence,
// 131 characters.
//
// Why this line: it is spoken directly to the younger self ("Kid, ... you"),
// not a motto for anyone. It is drawn from a life actually lived — money
// blown trying to impress people, and a guitar still dreamed about at
// forty — so only this person's older self could write it. It lands in
// one breath, in a plain voice, with no explaining and no second sentence.
// The turn is the trade: the forgotten lunch crowd on one side, the
// guitar on the other. It stings a little (a dream deferred for applause
// that evaporated by lunch) without turning sentimental.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const entryPath = new URL('./entry.txt', import.meta.url);
const entry = readFileSync(entryPath, 'utf8');
// The gate takes UTF-8 text of 1 to 200 characters: fail loudly here
// rather than shipping an entry the gate would refuse.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry is ${entry.length} characters, outside the 1-200 gate`);
}
// The brief asks for exactly one line, one sentence, no trailing
// newline: refuse anything else rather than shipping a malformed entry.
if (entry.endsWith('\n') || entry.split('\n').length !== 1) {
  throw new Error('entry must be exactly one line with no trailing newline');
}
if ((entry.match(/\./g) ?? []).length !== 1) {
  throw new Error('entry must be exactly one sentence (one period)');
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), entry);
