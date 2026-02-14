/**
 * Babel Dialect System: Named, versioned language evolution.
 * 
 * Each Dialect is a named collection of primitives with a version history.
 * As agents discover new patterns, dialects evolve (version up) or fork (speciate).
 */

export interface Dialect {
    name: string;           // "Babel-Alpha", "Babel-Beta", etc.
    version: number;        // 1, 2, 3...
    primitiveIds: number[]; // Which primitive IDs belong to this dialect
    efficiency: number;     // Compression ratio achieved by this dialect
    createdAt: number;      // Unix timestamp
    parentDialect?: string; // Which dialect it evolved from (null for genesis)
    status: "active" | "deprecated" | "forked";
}

export interface DialectEvolution {
    from: string;   // e.g. "Babel-Alpha v1"
    to: string;     // e.g. "Babel-Alpha v2"
    reason: string; // e.g. "Added 3 emergent patterns via consensus"
    timestamp: number;
}

const GREEK_SUFFIXES = [
    "Alpha", "Beta", "Gamma", "Delta", "Epsilon",
    "Zeta", "Eta", "Theta", "Iota", "Kappa"
];

export class DialectRegistry {
    private dialects: Map<string, Dialect> = new Map();
    private history: DialectEvolution[] = [];
    private dialectCount: number = 0;

    /**
     * Create the genesis dialect from bootstrap primitives.
     */
    public createGenesis(bootstrapIds: number[], efficiency: number): Dialect {
        const name = `Babel-${GREEK_SUFFIXES[this.dialectCount]}`;
        this.dialectCount++;

        const dialect: Dialect = {
            name,
            version: 1,
            primitiveIds: [...bootstrapIds],
            efficiency,
            createdAt: Date.now(),
            status: "active",
        };

        const key = `${dialect.name} v${dialect.version}`;
        this.dialects.set(key, dialect);
        console.log(`[Dialect] Genesis: ${key} (${bootstrapIds.length} primitives, ${(efficiency * 100).toFixed(1)}% efficiency)`);
        return dialect;
    }

    /**
     * Evolve an existing dialect by adding newly discovered primitives.
     * Creates a new version of the same dialect.
     */
    public evolve(dialectName: string, newPrimitiveIds: number[], newEfficiency: number): Dialect {
        const current = this.getLatest(dialectName);
        if (!current) {
            throw new Error(`Dialect ${dialectName} not found`);
        }

        // Mark old version
        const oldKey = `${current.name} v${current.version}`;

        // Create evolved version
        const evolved: Dialect = {
            name: current.name,
            version: current.version + 1,
            primitiveIds: [...current.primitiveIds, ...newPrimitiveIds],
            efficiency: newEfficiency,
            createdAt: Date.now(),
            parentDialect: oldKey,
            status: "active",
        };

        const newKey = `${evolved.name} v${evolved.version}`;
        this.dialects.set(newKey, evolved);

        // Record evolution
        this.history.push({
            from: oldKey,
            to: newKey,
            reason: `Added ${newPrimitiveIds.length} emergent patterns via consensus`,
            timestamp: Date.now(),
        });

        console.log(`[Dialect] Evolution: ${oldKey} → ${newKey} (+${newPrimitiveIds.length} primitives, ${(newEfficiency * 100).toFixed(1)}% efficiency)`);
        return evolved;
    }

    /**
     * Fork: Create a new dialect lineage (speciation).
     * Used when a subset of agents develops a fundamentally different language.
     */
    public fork(parentDialectName: string, primitiveIds: number[], efficiency: number): Dialect {
        const parent = this.getLatest(parentDialectName);
        const parentKey = parent ? `${parent.name} v${parent.version}` : "genesis";

        const name = `Babel-${GREEK_SUFFIXES[this.dialectCount]}`;
        this.dialectCount++;

        const forked: Dialect = {
            name,
            version: 1,
            primitiveIds: [...primitiveIds],
            efficiency,
            createdAt: Date.now(),
            parentDialect: parentKey,
            status: "active",
        };

        const key = `${forked.name} v${forked.version}`;
        this.dialects.set(key, forked);

        if (parent) {
            this.history.push({
                from: parentKey,
                to: key,
                reason: `Speciation: agents developed divergent optimization strategy`,
                timestamp: Date.now(),
            });
        }

        console.log(`[Dialect] Speciation: ${key} forked from ${parentKey} (${primitiveIds.length} primitives)`);
        return forked;
    }

    /**
     * Get the latest version of a named dialect.
     */
    public getLatest(dialectName: string): Dialect | undefined {
        let latest: Dialect | undefined;
        for (const [key, dialect] of this.dialects) {
            if (dialect.name === dialectName && (!latest || dialect.version > latest.version)) {
                latest = dialect;
            }
        }
        return latest;
    }

    /**
     * Get all dialects for evidence export.
     */
    public getAll(): Dialect[] {
        return Array.from(this.dialects.values());
    }

    /**
     * Get evolution history for evidence export.
     */
    public getHistory(): DialectEvolution[] {
        return [...this.history];
    }

    /**
     * Export a summary for the evidence package.
     */
    public toEvidence(): object {
        return {
            total_dialects: this.dialects.size,
            active_dialects: this.getAll().filter(d => d.status === "active").length,
            dialects: this.getAll().map(d => ({
                name: `${d.name} v${d.version}`,
                primitives: d.primitiveIds.length,
                efficiency: `${(d.efficiency * 100).toFixed(1)}%`,
                parent: d.parentDialect || "genesis",
                status: d.status,
            })),
            evolution_history: this.history.map(h => ({
                from: h.from,
                to: h.to,
                reason: h.reason,
            })),
        };
    }
}
