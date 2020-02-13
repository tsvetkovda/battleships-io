import { ITargetCell, Field } from '../../utils/interfaces';

import { SHOOT_AT_ENEMY, SET_ENEMY_FIELD, RESET_ENEMY_FIELD, EnemyTypes } from './types';

export const shootAtEnemy = (position: ITargetCell, enemyField: Field): EnemyTypes => ({
  type: SHOOT_AT_ENEMY,
  position,
  enemyField,
});

export const setEnemyField = (field: Field): EnemyTypes => ({
  type: SET_ENEMY_FIELD,
  field,
});

export const resetEnemyField = (): EnemyTypes => ({
  type: RESET_ENEMY_FIELD,
});
