import { OrientationState } from '../reducers';
import {
  CHANGE_ORIENTATION,
  HORIZONTAL,
  VERTICAL,
  ControlsTypes,
} from '../actions';

const initialState: OrientationState = HORIZONTAL;

const changeOrientationReducer = (
  state = initialState,
  action: ControlsTypes
): OrientationState => {
  if (action.type === CHANGE_ORIENTATION) {
    return state === HORIZONTAL ? VERTICAL : HORIZONTAL;
  } else {
    return state;
  }
};

export default changeOrientationReducer;
