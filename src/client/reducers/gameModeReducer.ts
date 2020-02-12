import { SELECT_GAME_MODE, LOBBY } from '../actions';

const gameModeReducer = (state = LOBBY, action) => {
  console.log(action);
  switch (action.type) {
    case SELECT_GAME_MODE:
      return action.mode;
    default:
      return state;
  }
};

export default gameModeReducer;
