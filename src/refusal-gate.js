#!/usr/bin/env node
const fs = require("fs");
if (!/^[ -~]+$/.test(process.argv[2] || "")) {
  console.error("REFUSAL: Non-ASCII entropy detected");
  process.exit(1);
}
if (!(process.argv[3] || "").includes("adef13")) {
  console.error("REFUSAL: Invalid Temporal Pulse (adef13 required)");
  process.exit(1);
}
console.log("ACTION APPROVED");
