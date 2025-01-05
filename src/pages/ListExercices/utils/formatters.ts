export function formatAmmunition(withoutConstraints: number, withConstraints: number): string {
  if (withoutConstraints === withConstraints) {
    return `${withoutConstraints}`;
  }
  return `${withoutConstraints} (${withConstraints} avec contraintes)`;
}

export function formatMagazines(magazine1: number, magazine2: number): string {
  if (magazine2 === 0) return `${magazine1}`;
  return `${magazine1} + ${magazine2}`;
}

export function formatDistance(distance: number): string {
  return `${distance}m`;
}