import { WAIT, WARM_UP, BATTLE, SET_BATTLE_PHASE } from '../actions';

const battlePhaseReducer = (state = WAIT, action) => {
  switch (action.type) {
    case SET_BATTLE_PHASE:
      return action.phase;
    default:
      return state;
  }
};

export default battlePhaseReducer;
