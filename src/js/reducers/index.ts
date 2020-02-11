import { combineReducers } from 'redux';

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

export default rootReducer;
