export const PLACE_SHIP = 'PLACE_SHIP';

export const placeShip = (position, shipSize, orientation, availableShips) => ({
  type: PLACE_SHIP,
  position,
  shipSize,
  orientation,
  availableShips,
});
