import { SIGN_IN } from '../actions';

const userSignInReducer = (state = true, action) => {
  switch (action.type) {
    case SIGN_IN:
      return !state;
    default:
      return state;
  }
};

export default userSignInReducer;
