import { generateMatrixArray } from "../utils";

import { PLACE_SHIP, HORIZONTAL, VERTICAL, RESET, SET_RANDOM } from "../actions";

import { cloneDeep } from "../utils";

const initialState = {
    field: generateMatrixArray(10).flat(),
    availableShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_SHIP:
            const { position, orientation } = action;
            let result = cloneDeep(state);
            let occupiedCells = [];
            let locked = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
                { x: 1, y: 1 },
                { x: -1, y: -1 },
                { x: -1, y: 1 },
                { x: 1, y: -1 },
            ];

            for (let i = 0; i < action.size; i++) {
                if (orientation === HORIZONTAL) {
                    let x = result.field.find(
                        el =>
                            el.x === position.x + i &&
                            el.y === position.y &&
                            !(el.locked || el.hasShip)
                    );
                    if (x !== undefined) occupiedCells.push(x);
                }

                if (orientation === VERTICAL) {
                    let x = result.field.find(
                        el =>
                            el.x === position.x &&
                            el.y === position.y + i &&
                            !(el.locked || el.hasShip)
                    );
                    if (x !== undefined) occupiedCells.push(x);
                }
            }

            if (occupiedCells.length === action.size && action.ships[action.size] > 0) {
                occupiedCells.forEach(el => {
                    locked.forEach(lock => {
                        result.field.forEach(val => {
                            if (val.x === el.x + lock.x && val.y === el.y + lock.y) {
                                val.className = "cell-locked";
                                val.locked = true;
                            }
                        });
                    });
                });
            }

            if (occupiedCells.length === action.size && action.ships[action.size] > 0) {
                result.field.forEach(el => {
                    if (occupiedCells.some(cell => cell.x === el.x && cell.y === el.y)) {
                        el.hasShip = true;
                        el.className = "cell-occupied";
                    }
                });
                result.availableShips[action.size] -= 1;
            }

            return { field: result.field, availableShips: result.availableShips };
        case RESET:
            return initialState;
        case SET_RANDOM:
        default:
            return state;
    }
};

export default playerReducer;
