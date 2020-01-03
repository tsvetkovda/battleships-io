import { generateMatrixArray } from "../utils";

import { PLACE_SHIP, HORIZONTAL, VERTICAL, RESET } from "../actions";

import { cloneDeep } from "../utils";

const initialState = { field: generateMatrixArray(10).flat(), ships: { 1: 4, 2: 3, 3: 2, 4: 1 } };

const playerReducer = (state = initialState, action) => {
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
                            !el.locked &&
                            !el.hasShip
                    );
                    if (idx !== -1) indexes.push(idx);
                }

                if (orientation === VERTICAL) {
                    let idx = result.field.findIndex(
                        el =>
                            el.x === position.x &&
                            el.y === position.y + i &&
                            !el.locked &&
                            !el.hasShip
                    );
                    if (idx !== -1) indexes.push(idx);
                }
            }

            if (indexes.length === action.size && action.ships[action.size] > 0) {
                for (let idx of indexes) {
                    result.field[idx].locked = true;
                    result.field[idx].hasShip = true;
                    result.field[idx].className = "cell-occupied";
                }

                result.ships[action.size] -= 1;
            }

            return { field: result.field, ships: result.ships };
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

export default playerReducer;
