import { WAIT, WARM_UP, BATTLE } from '../actions';

const battlePhaseReducer = (state = WAIT, action) => {
  switch (action.type) {
    case WAIT:
      return WAIT;
    case WARM_UP:
      return WARM_UP;
    case BATTLE:
      return BATTLE;
    default:
      return state;
  }
};

export default battlePhaseReducer;
