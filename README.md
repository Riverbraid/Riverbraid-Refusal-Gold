---
**Status:** Stationary (v1.5.0)
**Normative Source:** Riverbraid-Core
**Verification:** `npm test`
**Authority:** 2-of-2 GPG Threshold
---

<div align="center">

# O Riverbraid-Golds

### The Gold Cluster Assembler

**The orchestration layer that assembles all Gold petals into a unified, verifiable cluster.**

[![Gold Standard](https://img.shields.io/badge/Standard-Absolute_V2-gold)](#)
[![Status: Stationary](https://img.shields.io/badge/Status-Stationary-brightgreen)](#)
[![Version](https://img.shields.io/badge/Version-1.1.2-orange)](#)

</div>

## Purpose

Riverbraid-Golds is the meta-assembler for the Gold tier of the Riverbraid cluster. It manages all Gold petals as git submodules. It is not a runtime; it is an **orchestration surface**.

## The Absolute V2 Pipeline

1.  **HYGIENE:** Scans for "AI-Generic" distortion and entropy contamination.
2.  **ASSEMBLE:** Synchronizes all Gold-tier invariants via git submodule update.
3.  **BUILD:** Validates the thermodynamic signal: **Meaning > Tokens**.
4.  **VECTORS:** Exports validated predicate-based logic for deployment.

The pipeline enforces the **Fail-Closed contract**: a single failing petal halts the entire run.

## Quick Start

```bash
git clone --recursive [https://github.com/Riverbraid/Riverbraid-Golds.git](https://github.com/Riverbraid/Riverbraid-Golds.git)
cd Riverbraid-Golds
./braid-sync.sh
npm run build

---
## Part of the Riverbraid Constellation
A self-verifying integrity substrate anchored to stationary Merkle root **de2062** (Sovereign layer **adef13**).
Verification: `node run-vectors.cjs verify`
