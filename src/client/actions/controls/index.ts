import {
  CHANGE_ORIENTATION,
  ChangeOrientationType,
  SELECT_GAME_MODE,
  SelectGamemodeType,
  TimerTypes,
  DECREMENT_TIMER,
  RESET_TIMER,
  SELECT_SHIP,
  SelectShipType,
  SET_MESSAGE,
  SetMessageType,
  SET_BATTLE_PHASE,
  SetBattlePhaseType,
} from './types';

export const changeOrientation = (): ChangeOrientationType => ({
  type: CHANGE_ORIENTATION,
});

export const selectGamemode = (mode: string): SelectGamemodeType => ({
  type: SELECT_GAME_MODE,
  mode,
});

export const decrementTimer = (): TimerTypes => ({ type: DECREMENT_TIMER });

export const resetTimer = (): TimerTypes => ({ type: RESET_TIMER });

export const selectShip = (shipSize: number): SelectShipType => ({
  type: SELECT_SHIP,
  shipSize,
});

export const setMessage = (message: string): SetMessageType => ({
  type: SET_MESSAGE,
  message,
});

export const setBattlePhase = (phase: string): SetBattlePhaseType => ({
  type: SET_BATTLE_PHASE,
  phase,
});
