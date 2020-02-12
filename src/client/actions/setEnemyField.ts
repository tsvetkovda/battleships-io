export const SET_ENEMY_FIELD = 'SET_ENEMY_FIELD';
export const RESET_ENEMY_FIELD = 'RESET_ENEMY_FIELD';

export const setEnemyField = (field: object[]) => ({
  type: SET_ENEMY_FIELD,
  field,
});
export const resetEnemyField = () => ({ type: RESET_ENEMY_FIELD });
