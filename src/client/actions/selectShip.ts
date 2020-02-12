export const SELECT_SHIP = 'SELECT_SHIP';

export const selectShip = (size: number) => ({
  type: SELECT_SHIP,
  size,
});
