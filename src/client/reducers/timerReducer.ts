import { TimerState } from '../reducers';
import { DECREMENT_TIMER, RESET_TIMER, ControlsTypes } from '../actions';

const initialState: TimerState = 60;

const timerReducer = (
  state = initialState,
  action: ControlsTypes
): TimerState => {
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
