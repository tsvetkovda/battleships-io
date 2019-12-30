import { combineReducers } from "redux";

import gameModeReducer from "./gameModeReduces";
import registrationReducer from "./registrationReducer";
import userSignInReducer from "./userSignInReducer";

const rootReducer = combineReducers({
    mode: gameModeReducer,
    isRegistrationFormOpened: registrationReducer,
    isUserSignedIn: userSignInReducer,
});

export default rootReducer;
