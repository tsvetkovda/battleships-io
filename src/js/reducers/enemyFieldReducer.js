import { generateMatrixArray, enemyField, fakeField, cloneDeep } from "../utils";
import { SHOOT_AT_ENEMY } from "../actions";

const initialState = {
    field: fakeField,
};

const enemyFieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOOT_AT_ENEMY:
            const { position } = action;

            let newField = cloneDeep(state.field);

            let targetCell = newField.find(cell => cell.x === position.x && cell.y === position.y);

            targetCell !== undefined && targetCell.hasShip
                ? (targetCell.destroyed = true)
                : (targetCell.missed = true);

            return { field: newField };
        default:
            return state;
    }
};

export default enemyFieldReducer;
