import { combineReducers } from "redux";

import gameModeReducer from "./gameModeReduces";
import registrationReducer from "./registrationReducer";
import userSignInReducer from "./userSignInReducer";
import selectShipReducer from "./selectShipReducer";
import changeOrientationReducer from "./changeOrientationReducer";
import playerFieldReducer from "./playerFieldReducer";
import battlePhaseReducer from "./battlePhaseReducer";
import playerShipsReducer from "./playerShipsReducer";

const rootReducer = combineReducers({
    mode: gameModeReducer,
    isRegistrationFormOpened: registrationReducer,
    isUserSignedIn: userSignInReducer,
    selectedShipSize: selectShipReducer,
    orientation: changeOrientationReducer,
    field: playerFieldReducer,
    phase: battlePhaseReducer,
    ships: playerShipsReducer,
});

export default rootReducer;
