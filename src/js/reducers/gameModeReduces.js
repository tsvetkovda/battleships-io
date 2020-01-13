import { SELECT_GAMEMODE, LOBBY } from "../actions";

const gameModeReducer = (state = LOBBY, action) => {
    switch (action.type) {
        case SELECT_GAMEMODE:
            return action.payload;
        default:
            return state;
    }
};

export default gameModeReducer;
