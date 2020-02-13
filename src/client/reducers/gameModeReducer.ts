import { ModeState } from '../reducers';
import { SELECT_GAME_MODE, LOBBY, ControlsTypes } from '../actions';

const initialState: ModeState = LOBBY;

const gameModeReducer = (state = initialState, action: ControlsTypes): ModeState => {
  if (action.type === SELECT_GAME_MODE) {
    return action.mode;
  } else {
    return state;
  }
};

export default gameModeReducer;
