import { TOGGLE_REGISTRATION } from "../actions";

const registrationFormReducer = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_REGISTRATION:
            return !state;
        default:
            return state;
    }
};

export default registrationFormReducer;
