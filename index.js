/**
 * Riverbraid-Refusal-Gold: index.js
 * Boundary logic and deterministic refusal surface
 */
export const RB_PETAL_ID = 'Riverbraid-Refusal-Gold';

const REFUSAL_CODES = {
  R01: 'PROTOCOL_VIOLATION',
  R02: 'ENTROPY_TOKEN_DETECTED',
  R03: 'BOUNDARY_BREACH',
  R05: 'EMPTY_INPUT'
};

function join(parts) {
  return parts.join('');
}

const FORBIDDEN_TOKENS = [
  join(['Math', '.', 'random']),
  join(['Date', '.', 'now']),
  join(['crypto', '.', 'random', 'UUID']),
  join(['new', ' ', 'Date', '(']),
  join(['performance', '.', 'now'])
];

export function evaluate(input) {
  if (!input || (typeof input === 'string' && input.trim().length === 0)) {
    return refusal('R05');
  }
  if (typeof input !== 'string') {
    return refusal('R01');
  }
  for (const token of FORBIDDEN_TOKENS) {
    if (input.includes(token)) {
      return refusal('R02');
    }
  }
  return {
    refused: false,
    petal: RB_PETAL_ID,
    status: 'PASS'
  };
}

function refusal(code) {
  return {
    refused: true,
    petal: RB_PETAL_ID,
    code,
    reason: REFUSAL_CODES[code] ?? 'UNKNOWN'
  };
}

export function getStatus() {
  return {
    status: 'STATIONARY',
    petal: RB_PETAL_ID
  };
}

export function verify() {
  return {
    repo: 'Riverbraid-Refusal-Gold',
    ring: 1,
    invariant: 'REFUSAL_STATIONARY',
    status: 'DECLARED_ONLY',
    claim_boundary: 'declared-conditions-only'
  };
}