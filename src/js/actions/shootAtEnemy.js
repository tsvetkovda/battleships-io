export const SHOOT_AT_ENEMY = "SHOOT_AT_ENEMY";

export const shootAtEnemy = (position, enemyField) => ({
    type: SHOOT_AT_ENEMY,
    position,
    enemyField,
});
