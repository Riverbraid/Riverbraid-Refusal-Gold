import fs from "node:fs";
import crypto from "node:crypto";
const repo = "Riverbraid-Refusal-Gold";
const invariant = "REFUSAL_STATIONARY";
const requiredFiles = [
  "verify.mjs",
  "index.js",
  "protocol.steps",
  "package.json",
  "AUTHORITY.md",
  "RING.md"
];
const missing = requiredFiles.filter((file) => !fs.existsSync(file));
let protocolOk = false;
let indexExportsVerify = false;
let deterministicSurfaceOk = false;
let failureCodes = [];

if (missing.length > 0) {
  failureCodes.push("REQUIRED_FILES_MISSING");
}

try {
  const protocol = JSON.parse(fs.readFileSync("protocol.steps", "utf8").replace(/^\uFEFF/, ""));
  protocolOk =
    protocol.invariant === invariant &&
    Array.isArray(protocol.steps) &&
    protocol.steps.length > 0;
  if (!protocolOk) {
    failureCodes.push("PROTOCOL_STEPS_INVALID");
  }
} catch {
  failureCodes.push("PROTOCOL_STEPS_PARSE_FAILED");
}

try {
  const index = fs.readFileSync("index.js", "utf8");
  indexExportsVerify =
    index.includes("export function verify") ||
    index.includes("export { verify") ||
    index.includes("module.exports") && index.includes("verify");
  const banned = [
    "Date.now",
    "new Date",
    "Math.random",
    "crypto.randomUUID",
    "randomUUID"
  ];
  deterministicSurfaceOk = banned.every((term) => !index.includes(term));
  if (!indexExportsVerify) {
    failureCodes.push("INDEX_VERIFY_EXPORT_MISSING");
  }
  if (!deterministicSurfaceOk) {
    failureCodes.push("NONDETERMINISTIC_SURFACE_DETECTED");
  }
} catch {
  failureCodes.push("INDEX_READ_FAILED");
}

const ok =
  missing.length === 0 &&
  protocolOk &&
  indexExportsVerify &&
  deterministicSurfaceOk;

const hash = crypto.createHash("sha256");
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    hash.update(file);
    hash.update("\0");
    hash.update(fs.readFileSync(file));
    hash.update("\0");
  }
}

const output = {
  repo,
  ring: 1,
  invariant,
  status: ok ? "VERIFIED" : "FILES_PRESENT_UNVERIFIED",
  verification_scope: "ring1-file-surface-and-determinism-scan",
  claim_boundary: "declared-conditions-only",
  required_files: requiredFiles,
  missing_files: missing,
  protocol_valid: protocolOk,
  index_exports_verify: indexExportsVerify,
  deterministic_surface_ok: deterministicSurfaceOk,
  failure_codes: ok ? [] : failureCodes,
  digest: "sha256:" + hash.digest("hex")
};
fs.writeFileSync("verify-output.json", JSON.stringify(output, null, 2) + "\n", "utf8");
process.exit(ok ? 0 : 1);
