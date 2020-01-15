import { SELECT_GAME_MODE, LOBBY } from "../actions";

const gameModeReducer = (state = LOBBY, action) => {
    switch (action.type) {
        case SELECT_GAME_MODE:
            return action.payload;
        default:
            return state;
    }
};

export default gameModeReducer;
