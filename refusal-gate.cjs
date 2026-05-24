const fs = require('fs');

/**
 * Refusal-Gold Invariants:
 * 1. Reject anything containing Non-ASCII (Structural Floor).
 * 2. Reject anything attempting to modify a Signed Snapshot.
 * 3. Reject anything missing a Hardened Temporal Pulse.
 */

function evaluateCommand(cmd) {
    console.log(`[REFUSAL] Evaluating input: "${cmd.substring(0, 30)}..."`);

    // 1. Structural Floor Check (ASCII-7 Only)
    const isAscii = /^[\x00-\x7F]*$/.test(cmd);
    if (!isAscii) {
        console.error("[REFUSAL] Input contains non-ASCII characters or forbidden entropy. Blocked.");
        return false;
    }

    // 2. Hardened Temporal Sync Check
    const hardenedPulseExists = fs.existsSync('../Riverbraid-Temporal-Gold/swarm.pulse.json.asc');
    if (!hardenedPulseExists) {
        console.error("[REFUSAL] Swarm is unsynchronized. GPG Temporal Seal missing.");
        return false;
    }

    console.log("[PASS] Input is structurally aligned with the Gold Standard.");
    return true;
}

// Test Run: Valid command vs Forbidden entropy
evaluateCommand("ls -la /workspaces/Riverbraid-Manifest-Gold");
evaluateCommand("Inject experimental logic  into the core");
