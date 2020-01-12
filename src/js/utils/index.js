export const generateField = size => {
    let arr = [];
    for (let row = 0; row < size; row++) {
        arr[row] = [];
        for (let col = 0; col < size; col++) {
            arr[row][col] = {
                x: col,
                y: row,
                hasShip: false,
                locked: false,
                destroyed: false,
                missed: false,
                className: "cell",
            };
        }
    }
    return arr.flat();
};

export const cloneDeep = x => JSON.parse(JSON.stringify(x));

export const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomCell = () => ({ x: rndInt(0, 9), y: rndInt(0, 9) });

export const generateRandomOrientation = () => (rndInt(0, 100) > 50 ? "HORIZONTAL" : "VERTICAL");

export const lockedCells = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
];
