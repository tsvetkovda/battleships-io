import { CHANGE_ORIENTATION, HORIZONTAL, VERTICAL } from '../actions';

const changeOrientationReducer = (state = HORIZONTAL, action) => {
  switch (action.type) {
    case CHANGE_ORIENTATION:
      return state === HORIZONTAL ? VERTICAL : HORIZONTAL;
    default:
      return state;
  }
};

export default changeOrientationReducer;
