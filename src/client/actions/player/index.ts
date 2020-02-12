import { ITargetCell, IAvailableShips } from '../../utils/interfaces';

import {
  CAN_PLAYER_SHOOT,
  SET_NAME,
  SET_ROOM_ID,
  RESET_FIELD,
  RECEIVE_SHOT,
  PLACE_SHIP,
  PlayerTypes,
} from './types';

export const canPlayerShoot = (bool: boolean): PlayerTypes => ({
  type: CAN_PLAYER_SHOOT,
  bool,
});

export const setName = (name: string): PlayerTypes => ({
  type: SET_NAME,
  name,
});

export const setRoomId = (roomId: string): PlayerTypes => ({
  type: SET_ROOM_ID,
  roomId,
});

export const resetField = (): PlayerTypes => ({ type: RESET_FIELD });

export const receiveShot = (cell: ITargetCell): PlayerTypes => ({
  type: RECEIVE_SHOT,
  cell,
});

export const placeShip = (
  position: ITargetCell,
  shipSize: number,
  orientation: string,
  availableShips: IAvailableShips
): PlayerTypes => ({
  type: PLACE_SHIP,
  position,
  shipSize,
  orientation,
  availableShips,
});
