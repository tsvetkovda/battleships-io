import { DECREMENT } from "../actions";

const timerReducer = (state = 5, action) => {
    switch (action.type) {
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
};

export default timerReducer;
