export const PLACE_SHIP = "PLACE_SHIP";

export const placeShip = (position, size, orientation, ships) => ({
    type: PLACE_SHIP,
    position,
    size,
    orientation,
    ships,
});
