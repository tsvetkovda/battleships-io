import { SelectedShipSizeState } from '../reducers';
import { SELECT_SHIP, ControlsTypes } from '../actions';

const initialState: SelectedShipSizeState = null;

const selectShipReducer = (
  state = initialState,
  action: ControlsTypes
): SelectedShipSizeState => {
  if (action.type === SELECT_SHIP) {
    return action.shipSize;
  } else {
    return state;
  }
};

export default selectShipReducer;
