const generateField = (size: number): object[] => {
  const arr: object[][] = [];

  for (let row: number = 0; row < size; row++) {
    arr[row] = [];

    for (let col: number = 0; col < size; col++) {
      const cell = {
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
