import { combineReducers } from 'redux';

import { Enemy, IPlayer } from '../utils/interfaces';

import gameModeReducer from './gameModeReducer';
import selectShipReducer from './selectShipReducer';
import changeOrientationReducer from './changeOrientationReducer';
import playerReducer from './playerFieldReducer';
import battlePhaseReducer from './battlePhaseReducer';
import enemyFieldReducer from './enemyFieldReducer';
import messageReducer from './messageReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  mode: gameModeReducer,
  selectedShipSize: selectShipReducer,
  orientation: changeOrientationReducer,
  player: playerReducer,
  enemy: enemyFieldReducer,
  phase: battlePhaseReducer,
  message: messageReducer,
  timer: timerReducer,
});

export type ModeState = string;
export type SelectedShipSizeState = number | null;
export type OrientationState = string;
export type PlayerState = IPlayer;
export type EnemyState = Enemy;
export type PhaseState = string;
export type MessageState = string;
export type TimerState = number;

export default rootReducer;
