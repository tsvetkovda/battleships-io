import { DECREMENT, RESET_TIMER } from "../actions";

const timerReducer = (state = 60, action) => {
    switch (action.type) {
        case DECREMENT:
            return state - 1;
        case RESET_TIMER: {
            return state;
        }
        default:
            return state;
    }
};

export default timerReducer;
