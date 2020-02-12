import cloneDeep from '../utils/cloneDeep';
import generateField from '../utils/generateField';
import generateRoomId from '../utils/generateRoomId';
import lockedCells from '../utils/lockedCells';

import {
  PLACE_SHIP,
  HORIZONTAL,
  VERTICAL,
  RESET_FIELD,
  SET_NAME,
  SET_ROOM_ID,
  RECEIVE_SHOT,
  CAN_PLAYER_SHOOT,
  PlayerTypes,
} from '../actions';

import { ICell, IPlayer } from '../utils/interfaces';

import { PlayerState } from './index';

const initialState: PlayerState = {
  field: generateField(10),
  availableShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
  name: '',
  roomId: generateRoomId(),
  canShoot: false,
};

const playerReducer = (
  state = initialState,
  action: PlayerTypes
): PlayerState => {
  switch (action.type) {
    case PLACE_SHIP: {
      const { position, orientation, shipSize } = action;

      const newState: IPlayer = cloneDeep(state);
      const occupiedCells = [];

      for (let i = 0; i < shipSize; i++) {
        if (orientation === HORIZONTAL) {
          const x = newState.field.find(
            (cell: ICell) =>
              cell.x === position.x + i &&
              cell.y === position.y &&
              !(cell.locked || cell.hasShip)
          );

          if (x !== undefined) occupiedCells.push(x);
        }

        if (orientation === VERTICAL) {
          const x = newState.field.find(
            (cell: ICell) =>
              cell.x === position.x &&
              cell.y === position.y + i &&
              !(cell.locked || cell.hasShip)
          );

          if (x !== undefined) occupiedCells.push(x);
        }
      }

      if (
        occupiedCells.length === shipSize &&
        newState.availableShips[shipSize] > 0
      ) {
        occupiedCells.forEach((el) => {
          lockedCells.forEach((lock: { x: number; y: number }) => {
            newState.field.forEach((val: ICell) => {
              if (val.x === el.x + lock.x && val.y === el.y + lock.y) {
                val.className = 'cell-locked';
                val.locked = true;
              }
            });
          });
        });
      }

      if (
        occupiedCells.length === shipSize &&
        newState.availableShips[shipSize] > 0
      ) {
        newState.field.forEach((el: ICell) => {
          if (
            occupiedCells.some(
              (cell: ICell) => cell.x === el.x && cell.y === el.y
            )
          ) {
            el.hasShip = true;
            el.className = 'cell-occupied';
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

      const newField = cloneDeep(state.field);
      const targetCell: ICell = newField.find(
        (el: ICell) => el.x === cell.x && el.y === cell.y
      );

      if (targetCell && targetCell.hasShip) {
        targetCell.destroyed = true;
        targetCell.className = 'cell-destroyed';
      } else {
        targetCell.missed = true;
        targetCell.className = 'cell-missed';
      }

      return { ...state, field: newField };
    }

    case RESET_FIELD: {
      return {
        ...state,
        field: initialState.field,
        availableShips: initialState.availableShips,
        canShoot: state.canShoot,
      };
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
