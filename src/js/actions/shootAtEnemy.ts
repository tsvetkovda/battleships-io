export const SHOOT_AT_ENEMY = 'SHOOT_AT_ENEMY';

export const shootAtEnemy = (position: object, enemyField: object[]) => ({
  type: SHOOT_AT_ENEMY,
  position,
  enemyField,
});
