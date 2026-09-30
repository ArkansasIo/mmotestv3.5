interface CombatOrderInput {
  turns: number;
  availableTurns: number;
  attackUnits: number;
  targetProtected: boolean;
}

export function validateCombatOrder({
  turns,
  availableTurns,
  attackUnits,
  targetProtected,
}: CombatOrderInput): string | null {
  if (!Number.isInteger(turns) || turns < 1 || turns > 15) {
    return 'March orders must be a whole number between 1 and 15.';
  }
  if (targetProtected) return 'Target is protected.';
  if (!Number.isFinite(availableTurns) || availableTurns < turns) {
    return 'Insufficient march orders.';
  }
  if (!Number.isFinite(attackUnits) || attackUnits < 1) {
    return 'No strike troops are available.';
  }
  return null;
}