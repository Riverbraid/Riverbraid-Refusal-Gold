/**
 * Riverbraid-Refusal-Gold: index.js
 * Boundary Logic and Deterministic Rejection (v1.3.0)
 */

export const RB_PETAL_ID = 'Riverbraid-Refusal-Gold';

const REFUSAL_CODES = {
  R01: 'PROTOCOL_VIOLATION: input does not conform to governed schema',
  R02: 'ENTROPY_DETECTED: input contains non-deterministic token',
  R03: 'BOUNDARY_BREACH: request exceeds petal scope',
  R05: 'EMPTY_INPUT: no signal to process'
};

export function evaluate(input) {
  if (!input || (typeof input === 'string' && input.trim().length === 0)) {
    return refusal('R05');
  }
  if (typeof input !== 'string') {
    return refusal('R01');
  }
  const tokens = ['Date.now', 'Math.random', 'crypto.randomUUID', 'new Date(', 'performance.now'];
  for (const t of tokens) {
    if (input.includes(t)) return refusal('R02');
  }
  return { refused: false, petal: RB_PETAL_ID, status: 'PASS' };
}

function refusal(code) {
  return { refused: true, petal: RB_PETAL_ID, code, reason: REFUSAL_CODES[code] ?? 'UNKNOWN' };
}

export function getStatus() {
  return { status: 'STATIONARY', petal: RB_PETAL_ID };
}
