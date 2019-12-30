import { TOOGLE_REGISTRATION } from "../actions";

const registrationFormReducer = (state = false, action) => {
    switch (action.type) {
        case TOOGLE_REGISTRATION:
            return !state;
        default:
            return state;
    }
};

export default registrationFormReducer;
