import generate from "nanoid/generate";

import { generateField, lockedCells } from "../utils";

import {
    PLACE_SHIP,
    HORIZONTAL,
    VERTICAL,
    RESET,
    SET_RANDOM,
    SET_NAME,
    SET_ROOM_ID,
    RECEIVE_SHOT,
    CAN_PLAYER_SHOOT,
} from "../actions";

import { cloneDeep } from "../utils";

const initialState = {
    field: generateField(10),
    availableShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
    name: "",
    // roomId: generate("0123456789", 5),
    roomId: 1,
    canShoot: false,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_SHIP: {
            const { position, orientation, shipSize } = action;

            let newState = cloneDeep(state);
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
                ...state,
                field: newState.field,
                availableShips: newState.availableShips,
            };
        }

        case RECEIVE_SHOT: {
            const { cell } = action;

            let newField = cloneDeep(state.field);
            let targetCell = newField.find(el => el.x === cell.x && el.y === cell.y);

            if (targetCell && targetCell.hasShip) {
                targetCell.destroyed = true;
                targetCell.className = "cell-destroyed";
            } else {
                targetCell.missed = true;
                targetCell.className = "cell-missed";
            }

            return { ...state, field: newField };
        }

        case RESET: {
            return {
                ...state,
                field: initialState.field,
                availableShips: initialState.availableShips,
                canShoot: initialState.canShoot,
            };
        }

        case SET_RANDOM: {
        }

        case SET_NAME: {
            return {
                ...state,
                name: action.name,
            };
        }

        case SET_ROOM_ID: {
            return {
                ...state,
                roomId: action.roomId,
            };
        }

        case CAN_PLAYER_SHOOT: {
            return {
                ...state,
                canShoot: action.bool,
            };
        }

        default:
            return state;
    }
};

export default playerReducer;
