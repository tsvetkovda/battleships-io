import { SELECT_SHIP } from '../actions';

const selectShipReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_SHIP:
      return action.size;
    default:
      return state;
  }
};

export default selectShipReducer;
