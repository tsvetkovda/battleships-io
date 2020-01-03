import { generateMatrixArray } from "../utils";

import { PLACE_SHIP, HORIZONTAL, VERTICAL, RESET } from "../actions";

import { cloneDeep } from "../utils";

const initialState = {
    field: generateMatrixArray(10).flat(),
    availableShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
};

const playerReducer = (state = initialState, action) => {
    let locked = [-10, -1, 1, 10];
    switch (action.type) {
        case PLACE_SHIP:
            const { position, orientation } = action;
            let result = cloneDeep(state);
            let indexes = [];

            for (let i = 0; i < action.size; i++) {
                if (orientation === HORIZONTAL) {
                    let idx = result.field.findIndex(
                        el =>
                            el.x === position.x + i &&
                            el.y === position.y &&
                            !(el.locked || el.hasShip)
                    );
                    if (idx !== -1) indexes.push(idx);
                }

                if (orientation === VERTICAL) {
                    let idx = result.field.findIndex(
                        el =>
                            el.x === position.x &&
                            el.y === position.y + i &&
                            !(el.locked || el.hasShip)
                    );
                    if (idx !== -1) indexes.push(idx);
                }
            }

            if (indexes.length === action.size && action.ships[action.size] > 0) {
                for (let idx of indexes) {
                    console.log(idx);
                    for (let x of locked) {
                        console.log(x);
                        result.field[idx + x].className = "cell-locked";
                        result.field[idx + x].locked = true;
                    }
                }
            }

            if (indexes.length === action.size && action.ships[action.size] > 0) {
                for (let idx of indexes) {
                    result.field[idx].locked = true;
                    result.field[idx].hasShip = true;
                    result.field[idx].className = "cell-occupied";
                }

                result.availableShips[action.size] -= 1;
            }

            return { field: result.field, availableShips: result.availableShips };
        case RESET:
            return initialState;
        case "SET_RANDOM":

        default:
            return state;
    }
};

export default playerReducer;
