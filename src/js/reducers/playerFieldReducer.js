import { generateField, lockedCells } from "../utils";

import { PLACE_SHIP, HORIZONTAL, VERTICAL, RESET, SET_RANDOM } from "../actions";

import { cloneDeep } from "../utils";

const initialState = {
    field: generateField(10),
    availableShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_SHIP: {
            let newState = cloneDeep(state);
            const { position, orientation, shipSize } = action;

            let occupiedCells = [];

            for (let i = 0; i < shipSize; i++) {
                if (orientation === HORIZONTAL) {
                    let x = newState.field.find(
                        cell =>
                            cell.x === position.x + i &&
                            cell.y === position.y &&
                            !(cell.locked || cell.hasShip)
                    );

                    if (x !== undefined) occupiedCells.push(x);
                }

                if (orientation === VERTICAL) {
                    let x = newState.field.find(
                        cell =>
                            cell.x === position.x &&
                            cell.y === position.y + i &&
                            !(cell.locked || cell.hasShip)
                    );

                    if (x !== undefined) occupiedCells.push(x);
                }
            }

            if (occupiedCells.length === shipSize && newState.availableShips[shipSize] > 0) {
                occupiedCells.forEach(el => {
                    lockedCells.forEach(lock => {
                        newState.field.forEach(val => {
                            if (val.x === el.x + lock.x && val.y === el.y + lock.y) {
                                val.className = "cell-locked";
                                val.locked = true;
                            }
                        });
                    });
                });
            }

            if (occupiedCells.length === shipSize && newState.availableShips[shipSize] > 0) {
                newState.field.forEach(el => {
                    if (occupiedCells.some(cell => cell.x === el.x && cell.y === el.y)) {
                        el.hasShip = true;
                        el.className = "cell-occupied";
                    }
                });
                newState.availableShips[shipSize]--;
            }

            return {
                field: newState.field,
                availableShips: newState.availableShips,
            };
        }

        case RESET: {
            return initialState;
        }

        case SET_RANDOM: {
        }

        default:
            return state;
    }
};

export default playerReducer;
