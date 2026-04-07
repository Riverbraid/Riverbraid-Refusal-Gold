import { execSync } from 'child_process';

const verifyGate = () => {
  try {
    // 1. Check Coherence (The Frequency)
    const rawCognition = execSync('node /workspaces/Riverbraid-Cognition/bin/evaluate_coherence.mjs').toString();
    const cognition = JSON.parse(rawCognition);

    // 2. Check Cadence (The Time)
    const rawTemporal = execSync('node /workspaces/Riverbraid-Temporal-Gold/bin/chronos_gate.mjs').toString();
    const temporal = JSON.parse(rawTemporal);

    if (cognition.frequency === 1 && temporal.alignment_active) {
      console.log("SHIELD_OPEN: Frequency Steady and Cadence Aligned.");
      process.exit(0);
    } else if (cognition.frequency === 1 && !temporal.alignment_active) {
      // Allow override for manual stewardship, but flag it
      console.warn("SHIELD_WARNING: Frequency Steady but Outside Cadence Window.");
      process.exit(0); 
    } else {
      console.error(`SHIELD_LOCKED: Frequency is ${cognition.signal}. Action Refused.`);
      process.exit(1);
    }
  } catch (e) {
    console.error("SHIELD_LOCKED: Temporal or Cognitive Silence.");
    process.exit(1);
  }
};

verifyGate();
