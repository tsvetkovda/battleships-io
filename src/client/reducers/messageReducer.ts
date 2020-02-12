import { MessageState } from '../reducers';
import { SET_MESSAGE, ControlsTypes } from '../actions';

const initialState: MessageState = '';

const messageReducer = (
  state = initialState,
  action: ControlsTypes
): MessageState => {
  if (action.type === SET_MESSAGE) {
    return action.message;
  } else {
    return state;
  }
};

export default messageReducer;
