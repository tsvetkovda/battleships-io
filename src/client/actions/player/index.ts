import { ITargetCell, IAvailableShips } from '../../utils/interfaces';

import {
  CAN_PLAYER_SHOOT,
  CanPlayerShootType,
  SET_NAME,
  SetNameType,
  SET_ROOM_ID,
  SetRoomIdType,
  RESET_FIELD,
  ResetFieldType,
  RECEIVE_SHOT,
  ReceiveShotType,
  PLACE_SHIP,
  PlaceShipType,
} from './types';

export const canPlayerShoot = (bool: boolean): CanPlayerShootType => ({
  type: CAN_PLAYER_SHOOT,
  bool,
});

export const setName = (name: string): SetNameType => ({
  type: SET_NAME,
  name,
});

export const setRoomId = (roomId: string): SetRoomIdType => ({
  type: SET_ROOM_ID,
  roomId,
});

export const resetField = (): ResetFieldType => ({ type: RESET_FIELD });

export const receiveShot = (cell: ITargetCell): ReceiveShotType => ({
  type: RECEIVE_SHOT,
  cell,
});

export const placeShip = (
  position: ITargetCell,
  shipSize: number,
  orientation: string,
  availableShips: IAvailableShips
): PlaceShipType => ({
  type: PLACE_SHIP,
  position,
  shipSize,
  orientation,
  availableShips,
});
