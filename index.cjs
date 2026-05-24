((env) => { const WHITELIST = ['PATH', 'GPG_TTY', 'HOME', 'USER', 'LANG']; Object.keys(env).forEach(key => { if (!WHITELIST.includes(key)) delete env[key]; }); env.NODE_NO_WARNINGS = '1'; })(process.env);

'use strict';
const PREDICATES = ['PROTOCOL_VIOLATION', 'IDENTITY_MISMATCH', 'ENTROPY_DETECTED'];

exports.checkRefusal = (context) => {
  // Mechanical Honesty: Reject if any core invariant is violated
  if (!context.anchor || context.anchor !== 'de2062') return { refused: true, reason: 'IDENTITY_MISMATCH' };
  return { refused: false };
};

exports.getStatus = () => ({
  petal: 'Refusal-Gold',
  signal: 'BOUNDARY_LOGIC',
  status: 'STATIONARY'
});
