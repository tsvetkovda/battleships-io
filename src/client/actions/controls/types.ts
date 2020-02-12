export const CHANGE_ORIENTATION = 'CHANGE_ORIENTATION';

interface ChangeOrientationAction {
  type: typeof CHANGE_ORIENTATION;
}

export const SELECT_GAME_MODE = 'SELECT_GAME_MODE';
export const LOBBY = 'LOBBY';
export const MULTIPLAYER = 'MULTIPLAYER';

interface SelectGamemodeAction {
  type: typeof SELECT_GAME_MODE;
  mode: string;
}

export const DECREMENT_TIMER = 'DECREMENT_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

interface DecrementTimerAction {
  type: typeof DECREMENT_TIMER;
}

interface ResetTimerAction {
  type: typeof RESET_TIMER;
}

export const SELECT_SHIP = 'SELECT_SHIP';

interface SelectShipAction {
  type: typeof SELECT_SHIP;
  shipSize: number;
}

export const SET_MESSAGE = 'SET_MESSAGE';

interface SetMessageAction {
  type: typeof SET_MESSAGE;
  message: string;
}

export const SET_BATTLE_PHASE = 'SET_BATTLE_PHASE';
export const WAIT = 'WAIT';
export const WARM_UP = 'WARM_UP';
export const BATTLE = 'BATTLE';

interface SetBattlePhaseAction {
  type: typeof SET_BATTLE_PHASE;
  phase: string;
}

export type ChangeOrientationType = ChangeOrientationAction;
export type SelectGamemodeType = SelectGamemodeAction;
export type TimerTypes = DecrementTimerAction | ResetTimerAction;
export type SelectShipType = SelectShipAction;
export type SetMessageType = SetMessageAction;
export type SetBattlePhaseType = SetBattlePhaseAction;
