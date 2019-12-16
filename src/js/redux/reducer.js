import TICK from "./actions";

const initialState = {
    time: new Date().toLocaleTimeString(),
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case TICK:
            return {
                time: new Date().toLocaleTimeString(),
            };
        default:
            return state;
    }
}

export default reducer;
