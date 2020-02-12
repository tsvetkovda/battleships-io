import { ICell } from './interfaces';

const generateField = (size: number): ICell[] => {
  const arr: ICell[][] = [];

  for (let row: number = 0; row < size; row++) {
    arr[row] = [];

    for (let col: number = 0; col < size; col++) {
      const cell: ICell = {
        x: col,
        y: row,
        hasShip: false,
        locked: false,
        destroyed: false,
        missed: false,
        className: 'cell',
      };

      arr[row][col] = cell;
    }
  }
  return arr.flat();
};

export default generateField;
