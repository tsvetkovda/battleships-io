import {
  CHANGE_ORIENTATION,
  SELECT_GAME_MODE,
  DECREMENT_TIMER,
  RESET_TIMER,
  SELECT_SHIP,
  SET_MESSAGE,
  SET_BATTLE_PHASE,
  ControlsTypes,
} from './types';

export const changeOrientation = (): ControlsTypes => ({
  type: CHANGE_ORIENTATION,
});

export const selectGamemode = (mode: string): ControlsTypes => ({
  type: SELECT_GAME_MODE,
  mode,
});

export const decrementTimer = (): ControlsTypes => ({ type: DECREMENT_TIMER });

export const resetTimer = (): ControlsTypes => ({ type: RESET_TIMER });

export const selectShip = (shipSize: number): ControlsTypes => ({
  type: SELECT_SHIP,
  shipSize,
});

export const setMessage = (message: string): ControlsTypes => ({
  type: SET_MESSAGE,
  message,
});

export const setBattlePhase = (phase: string): ControlsTypes => ({
  type: SET_BATTLE_PHASE,
  phase,
});
