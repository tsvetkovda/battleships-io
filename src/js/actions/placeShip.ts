export const PLACE_SHIP = 'PLACE_SHIP';

export const placeShip = (
  position: object,
  shipSize: number,
  orientation: string,
  availableShips: object
) => ({
  type: PLACE_SHIP,
  position,
  shipSize,
  orientation,
  availableShips,
});
