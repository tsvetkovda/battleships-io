import { ITargetCell, Field } from '../../utils/interfaces';

export const SHOOT_AT_ENEMY = 'SHOOT_AT_ENEMY';

interface ShootAtEnemyAction {
  type: typeof SHOOT_AT_ENEMY;
  position: ITargetCell;
  enemyField: Field;
}

export const SET_ENEMY_FIELD = 'SET_ENEMY_FIELD';

interface SetEnemyFieldAction {
  type: typeof SET_ENEMY_FIELD;
  field: Field;
}

export const RESET_ENEMY_FIELD = 'RESET_ENEMY_FIELD';

interface ResetEnemyFieldAction {
  type: typeof RESET_ENEMY_FIELD;
}

export type ShootAtEnemyType = ShootAtEnemyAction;
export type SetEnemyFieldType = SetEnemyFieldAction;
export type ResetEnemyFieldType = ResetEnemyFieldAction;
