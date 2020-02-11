export interface IPosition {
  x: number;
  y: number;
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

export interface IPlayer {
  field: ICell[];
  availableShips: IAvailableShips;
  name: string;
  roomId: string;
  canShoot: boolean;
}
