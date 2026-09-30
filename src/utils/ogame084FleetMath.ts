export interface OGame084Coordinates {
  galaxy: number;
  system: number;
  position: number;
}

export interface OGame084FleetShip {
  speed: number;
  fuelConsumption: number;
  quantity: number;
}

export interface OGame084FleetTravel {
  distance: number;
  slowestSpeed: number;
  speedPercent: number;
  flightTimeSeconds: number;
  deuteriumConsumption: number;
}

export function calculateOGame084FleetDistance(
  origin: OGame084Coordinates,
  destination: OGame084Coordinates,
): number {
  if (origin.galaxy !== destination.galaxy) {
    return Math.abs(destination.galaxy - origin.galaxy) * 20000;
  }

  if (origin.system !== destination.system) {
    return Math.abs(destination.system - origin.system) * 5 * 19 + 2700;
  }

  if (origin.position !== destination.position) {
    return Math.abs(destination.position - origin.position) * 5 + 1000;
  }

  return 5;
}

export function calculateOGame084FleetTravel(
  origin: OGame084Coordinates,
  destination: OGame084Coordinates,
  fleet: readonly OGame084FleetShip[],
  speedPercent: number,
  universeSpeed: number,
  deuteriumConsumptionFactor = 1,
): OGame084FleetTravel | null {
  const selectedShips = fleet.filter((ship) => ship.quantity > 0);
  if (selectedShips.length === 0) return null;

  const slowestSpeed = Math.min(...selectedShips.map((ship) => ship.speed));
  if (slowestSpeed <= 0 || universeSpeed <= 0) return null;

  const distance = calculateOGame084FleetDistance(origin, destination);
  const normalizedSpeedPercent = Math.min(100, Math.max(10, Math.round(speedPercent / 10) * 10));
  const flightTimeSeconds = Math.round(
    (35000 / (normalizedSpeedPercent / 10) * Math.sqrt(distance * 10 / slowestSpeed) + 10) / universeSpeed,
  );

  const consumption = selectedShips.reduce((total, ship) => {
    const shipSpeedPercent = 35000 / (flightTimeSeconds * universeSpeed - 10)
      * Math.sqrt(distance * 10 / ship.speed);
    const speedFactor = shipSpeedPercent / 10 + 1;
    const shipConsumption = ship.fuelConsumption * ship.quantity * distance / 35000 * speedFactor * speedFactor;
    return total + Math.trunc(shipConsumption);
  }, 0);

  return {
    distance,
    slowestSpeed,
    speedPercent: normalizedSpeedPercent,
    flightTimeSeconds,
    deuteriumConsumption: Math.max(1, Math.round(consumption * deuteriumConsumptionFactor) + 1),
  };
}