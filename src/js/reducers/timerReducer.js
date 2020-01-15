import { DECREMENT, RESET_TIMER } from "../actions";

const initialState = 60;

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case DECREMENT:
            return state - 1;
        case RESET_TIMER: {
            return initialState;
        }
        default:
            return state;
    }
};

export default timerReducer;
