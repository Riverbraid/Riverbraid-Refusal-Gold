import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const requiredFiles = [
  "verify.mjs",
  "index.js",
  "protocol.steps",
  "package.json",
  "AUTHORITY.md",
  "RING.md"
];

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "riverbraid-refusal-fail-closed-"));

try {
  for (const file of requiredFiles) {
    fs.copyFileSync(path.join(repoRoot, file), path.join(tempRoot, file));
  }

  fs.rmSync(path.join(tempRoot, "AUTHORITY.md"));

  const result = spawnSync(process.execPath, ["verify.mjs"], {
    cwd: tempRoot,
    encoding: "utf8"
  });

  assert.equal(result.status, 1, `expected exit code 1, received ${result.status}`);

  const outputPath = path.join(tempRoot, "verify-output.json");
  assert.equal(fs.existsSync(outputPath), true, "verify-output.json must be written on failure");

  const output = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  assert.equal(output.status, "FILES_PRESENT_UNVERIFIED");
  assert.equal(output.missing_files.includes("AUTHORITY.md"), true);
  assert.equal(output.failure_codes.includes("REQUIRED_FILES_MISSING"), true);
  assert.equal(output.claim_boundary, "declared-conditions-only");

  console.log("REFUSAL_GOLD_FAIL_CLOSED_NEGATIVE_PASS");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
