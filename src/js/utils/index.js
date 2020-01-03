export const generateMatrixArray = size => {
    let arr = [];
    for (let row = 0; row < size; row++) {
        arr[row] = [];
        for (let col = 0; col < size; col++) {
            arr[row][col] = { x: col, y: row, hasShip: false, locked: false, className: "cell" };
        }
    }
    return arr;
};

export const cloneDeep = x => JSON.parse(JSON.stringify(x));
