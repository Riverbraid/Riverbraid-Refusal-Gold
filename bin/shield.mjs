import { execSync } from 'child_process';

/**
 * Refusal-Gold: The Fail-Closed Gatekeeper.
 * Blocks execution unless Cognition reports STEADY (1.0).
 */
const verifyGate = () => {
  try {
    // 1. Query Cognition for the current frequency
    const rawCognition = execSync('node /workspaces/Riverbraid-Cognition/bin/evaluate_coherence.mjs').toString();
    const cognition = JSON.parse(rawCognition);

    if (cognition.frequency === 1) {
      console.log("SHIELD_OPEN: Frequency is Steady. Proceed.");
      process.exit(0);
    } else {
      console.error(`SHIELD_LOCKED: Frequency is ${cognition.signal} (${cognition.frequency}). Action Refused.`);
      process.exit(1);
    }
  } catch (e) {
    console.error("SHIELD_LOCKED: Cognitive Silence detected. Emergency Refusal.");
    process.exit(1);
  }
};

verifyGate();
