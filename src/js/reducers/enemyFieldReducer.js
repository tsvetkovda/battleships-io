import { generateMatrixArray } from "../utils";

const initialState = {
    field: generateMatrixArray(10).flat(),
    availableShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
};

const enemyFieldReducer = (state = initialState, action) => {
    return state;
};

export default enemyFieldReducer;
