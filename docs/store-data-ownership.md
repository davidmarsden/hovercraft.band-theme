# Store data ownership

Provider-wide facts belong in `data/platforms.json`. Facts about a specific recording/release belong in `data/releases.json`. Templates should not contain release URLs. This keeps a 2025 recording from accidentally inheriting a 2026 release destination.
