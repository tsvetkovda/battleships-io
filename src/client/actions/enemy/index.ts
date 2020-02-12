import { ITargetCell, Field } from '../../utils/interfaces';

import {
  SHOOT_AT_ENEMY,
  ShootAtEnemyType,
  SET_ENEMY_FIELD,
  SetEnemyFieldType,
  RESET_ENEMY_FIELD,
  ResetEnemyFieldType,
} from './types';

export const shootAtEnemy = (
  position: ITargetCell,
  enemyField: Field
): ShootAtEnemyType => ({
  type: SHOOT_AT_ENEMY,
  position,
  enemyField,
});

export const setEnemyField = (field: Field): SetEnemyFieldType => ({
  type: SET_ENEMY_FIELD,
  field,
});

export const resetEnemyField = (): ResetEnemyFieldType => ({
  type: RESET_ENEMY_FIELD,
});
