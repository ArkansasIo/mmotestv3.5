export interface RaidBounty {
  crowns: number;
  iron: number;
  moonstone: number;
}

export interface RaidReport {
  id: string;
  createdAt: string;
  encounterType: 'warlord' | 'dungeon';
  name: string;
  title: string;
  victory: boolean;
  rounds: number;
  warbandPower: number;
  threatPower: number;
  sabotageUsed: boolean;
  crowns: number;
  iron: number;
  moonstone: number;
  log: string[];
}

export interface RaidResolution {
  victory: boolean;
  rounds: number;
  warbandPower: number;
  threatPower: number;
  crowns: number;
  iron: number;
  moonstone: number;
}

export const RAID_HISTORY_LIMIT = 25;

export function resolveRaid(input: {
  warbandPower: number;
  threatPower: number;
  bounty: RaidBounty;
  sabotageUsed: boolean;
}): RaidResolution {
  const warbandPower = Math.max(0, Math.floor(input.warbandPower));
  const baseThreat = Math.max(0, Math.floor(input.threatPower));
  const threatPower = Math.ceil(baseThreat * (input.sabotageUsed ? 0.72 : 1));
  const victory = warbandPower >= threatPower;
  const rounds = Math.min(8, Math.max(1, Math.ceil((threatPower / Math.max(1, warbandPower)) * 2)));

  return {
    victory,
    rounds,
    warbandPower,
    threatPower,
    crowns: victory ? Math.max(0, Math.round(input.bounty.crowns)) : 0,
    iron: victory ? Math.max(0, Math.round(input.bounty.iron)) : 0,
    moonstone: victory ? Math.max(0, Math.round(input.bounty.moonstone)) : 0,
  };
}

function isRaidReport(value: unknown): value is RaidReport {
  if (!value || typeof value !== 'object') return false;
  const report = value as Partial<RaidReport>;
  return (
    typeof report.id === 'string' &&
    typeof report.createdAt === 'string' &&
    Number.isFinite(Date.parse(report.createdAt)) &&
    (report.encounterType === 'warlord' || report.encounterType === 'dungeon') &&
    typeof report.name === 'string' &&
    typeof report.title === 'string' &&
    typeof report.victory === 'boolean' &&
    Number.isInteger(report.rounds) &&
    Number.isFinite(report.warbandPower) &&
    Number.isFinite(report.threatPower) &&
    typeof report.sabotageUsed === 'boolean' &&
    Number.isFinite(report.crowns) &&
    Number.isFinite(report.iron) &&
    Number.isFinite(report.moonstone) &&
    Array.isArray(report.log) &&
    report.log.every((line) => typeof line === 'string')
  );
}

export function parseRaidHistory(raw: string | null): RaidReport[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isRaidReport).slice(0, RAID_HISTORY_LIMIT)
      : [];
  } catch {
    return [];
  }
}