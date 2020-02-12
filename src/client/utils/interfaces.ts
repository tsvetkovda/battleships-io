export interface ITargetCell {
  x: number;
  y: number;
}

export interface IShipPosition {
  position: object;
  shipSize: number;
  orientation: string;
  availableShips: object;
}

export interface ICell {
  x: number;
  y: number;
  hasShip: boolean;
  locked: boolean;
  destroyed: boolean;
  missed: boolean;
  className: string;
}

export interface IAvailableShips {
  1: number;
  2: number;
  3: number;
  4: number;
}

export interface Field {
  field: ICell[];
}

export interface IPlayer {
  field: Field;
  availableShips: IAvailableShips;
  name: string;
  roomId: string;
  canShoot: boolean;
}
