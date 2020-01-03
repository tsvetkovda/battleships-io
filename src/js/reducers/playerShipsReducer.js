import { PLACE_SHIP, RESET } from "../actions";

const initialState = { 1: 4, 2: 3, 3: 2, 4: 1 };

import { cloneDeep } from "../utils";

const playerShipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_SHIP:
            let x = cloneDeep(state);
            if (x[action.size] > 0) x[action.size] -= 1;
            return x;
        case RESET:
            return initialState;
        default:
            return state;
    }
};

export default playerShipsReducer;
