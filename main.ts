import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const reply =
  "I'm out of office, so your email has been promoted to a future problem with excellent job security.";

// Mirror the gate: UTF-8 text, 1-140 characters, single line, not only white space.
function assertValidReply(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 140 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidReply(reply);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, reply, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
