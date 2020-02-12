import { DECREMENT_TIMER, RESET_TIMER } from '../actions';

const initialState = 60;

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DECREMENT_TIMER:
      return state - 1;
    case RESET_TIMER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default timerReducer;
