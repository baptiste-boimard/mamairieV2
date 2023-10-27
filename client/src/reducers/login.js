import {
  TOGGLE_LOGIN,
  TOGGLE_SIGNUP,
  LOGIN,
  SET_LOGOUT,
  ACTIVE_CONNECTION_BUTTON,
  SET_TOWNHALL_ID,
} from '../actions/login';

export const initialState = {
  logged: true,
  isOpenSignup: false,
  isOpenLogin: false,
  activeConnectionButton: false,
  redirectTo: '',
  townHallId: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /** Display login element */
    case TOGGLE_LOGIN: {
      return {
        ...state,
        isOpenLogin: !state.isOpenLogin,
        isOpenSignup: false,
        activeConnectionButton: !state.activeConnectionButton,
      };
    }

    /** Display signup element */
    case TOGGLE_SIGNUP: {
      return {
        ...state,
        isOpenSignup: !state.isOpenSignup,
        isOpenLogin: false,
        activeConnectionButton: false,
      };
    }

    /** Change value logged to true when person logged */
    case LOGIN: {
      return {
        ...state,
        logged: true,
        // loginMessage: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    }

    /** Change value logged to false when person disconnected */
    case SET_LOGOUT: {
      return {
        ...state,
        logged: false,
        pseudo: '',
        inseeCode: '',
        activeConnectionButton: false,
      };
    }

    /** Allow active connection element when signup success */
    case ACTIVE_CONNECTION_BUTTON: {
      return {
        ...state,
        activeConnectionButton: true,
      };
    }

    /** Assign value to townHallId at the first load of app component */
    case SET_TOWNHALL_ID:
      return {
        ...state,
        townHallId: action.townHallId,
      };
    default:
      return state;
  }
};

export default reducer;
