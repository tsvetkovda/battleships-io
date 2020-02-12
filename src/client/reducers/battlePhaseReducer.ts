import { PhaseState } from '../reducers';
import { WAIT, SET_BATTLE_PHASE, ControlsTypes } from '../actions';

const initialState: PhaseState = WAIT;

const battlePhaseReducer = (
  state = initialState,
  action: ControlsTypes
): PhaseState => {
  if (action.type === SET_BATTLE_PHASE) {
    return action.phase;
  } else {
    return state;
  }
};

export default battlePhaseReducer;
