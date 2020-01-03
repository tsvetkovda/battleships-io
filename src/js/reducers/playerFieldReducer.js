import { generateMatrixArray } from "../utils";

import { PLACE_SHIP, HORIZONTAL, VERTICAL, RESET } from "../actions";

import { cloneDeep } from "../utils";

const initialState = generateMatrixArray(10).flat();

const playerFieldReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case PLACE_SHIP:
            let result = cloneDeep(state);
            let indexes = [];

            for (let i = 0; i < action.size; i++) {
                if (action.orientation === HORIZONTAL) {
                    let idx = result.findIndex(
                        el =>
                            el.x === action.position.x + i &&
                            el.y === action.position.y &&
                            !el.locked &&
                            !el.hasShip
                    );
                    if (idx !== -1) indexes.push(idx);
                }

                if (action.orientation === VERTICAL) {
                    let idx = result.findIndex(
                        el =>
                            el.x === action.position.x &&
                            el.y === action.position.y + i &&
                            !el.locked &&
                            !el.hasShip
                    );
                    if (idx !== -1) indexes.push(idx);
                }
            }

            if (indexes.length === action.size && action.ships[action.size] > 0) {
                for (let idx of indexes) {
                    result[idx].locked = true;
                    result[idx].hasShip = true;
                    result[idx].className = "cell-occupied";
                }
            }

            return result;
        case RESET:
            return initialState;
        case "SET_RANDOM":
            const { ships, size } = action;
            console.log(ships, size);
            for (let x in ships) {
                console.log(x);
            }
        default:
            return state;
    }
};

export default playerFieldReducer;
