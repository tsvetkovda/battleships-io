import { ITargetCell, IAvailableShips } from '../../utils/interfaces';

export const CAN_PLAYER_SHOOT = 'CAN_PLAYER_SHOOT';

interface CanPlayerShootAction {
  type: typeof CAN_PLAYER_SHOOT;
  bool: boolean;
}

export const SET_NAME = 'SET_NAME';

interface SetNameTypeAction {
  type: typeof SET_NAME;
  name: string;
}

export const SET_ROOM_ID = 'SET_ROOM_ID';

interface SetRoomIdAction {
  type: typeof SET_ROOM_ID;
  roomId: string;
}

export const RESET_FIELD = 'RESET_FIELD';

interface ResetFieldAction {
  type: typeof RESET_FIELD;
}

export const RECEIVE_SHOT = 'RECEIVE_SHOT';

interface ReceiveShotAction {
  type: typeof RECEIVE_SHOT;
  cell: ITargetCell;
}

export const PLACE_SHIP = 'PLACE_SHIP';
export const HORIZONTAL = 'HORIZONTAL';
export const VERTICAL = 'VERTICAL';

interface PlaceShipAction {
  type: typeof PLACE_SHIP;
  position: ITargetCell;
  shipSize: number;
  orientation: string;
  availableShips: IAvailableShips;
}

export type CanPlayerShootType = CanPlayerShootAction;
export type SetNameType = SetNameTypeAction;
export type SetRoomIdType = SetRoomIdAction;
export type ResetFieldType = ResetFieldAction;
export type ReceiveShotType = ReceiveShotAction;
export type PlaceShipType = PlaceShipAction;
