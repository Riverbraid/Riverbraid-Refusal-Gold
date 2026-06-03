import { execFileSync } from 'child_process';

const cognitionGate = '/workspaces/Riverbraid-Cognition/bin/evaluate_coherence.mjs';
const temporalGate = '/workspaces/Riverbraid-Temporal-Gold/bin/chronos_gate.mjs';

function runJsonNodeScript(scriptPath) {
  const raw = execFileSync('node', [scriptPath], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });
  return JSON.parse(raw);
}

const verifyGate = () => {
  try {
    const cognition = runJsonNodeScript(cognitionGate);
    const temporal = runJsonNodeScript(temporalGate);

    if (cognition.frequency === 1 && temporal.alignment_active) {
      console.log('SHIELD_OPEN: Frequency Steady and Cadence Aligned.');
      process.exit(0);
    }

    if (cognition.frequency === 1 && !temporal.alignment_active) {
      console.warn('SHIELD_WARNING: Frequency Steady but Outside Cadence Window.');
      process.exit(0);
    }

    console.error(`SHIELD_LOCKED: Frequency is ${cognition.signal}. Action Refused.`);
    process.exit(1);
  } catch {
    console.error('SHIELD_LOCKED: Temporal or Cognitive Silence.');
    process.exit(1);
  }
};

verifyGate();
