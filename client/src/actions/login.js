/** Action for Login component */

/** Display login element */
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const toggleLogin = (bool) => ({
  type: TOGGLE_LOGIN,
  isOpenLogin: bool,
});

/** Display signup element */
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';
export const toggleSignup = () => ({
  type: TOGGLE_SIGNUP,
});

/** Change value logged to true when person logged */
export const LOGIN = 'LOGIN';
export const login = () => ({
  type: LOGIN,
});

/** Action to middleware auth to logout and delete auth token */
export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
});

/** Change value logged to false when person disconnected */
export const SET_LOGOUT = 'SET_LOGOUT';
export const setLogout = () => ({
  type: SET_LOGOUT,
});

/** Submit signup form to auth midlleware for auth API */
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const submitSignup = (pseudo, email, password, inseeCode) => ({
  type: SUBMIT_SIGNUP,
  pseudo,
  email,
  password,
  inseeCode,
});

/** Submit login form to auth midlleware for auth API */
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const submitLogin = (email, password) => ({
  type: SUBMIT_LOGIN,
  email,
  password,
});

/** Allow active connection element when signup success */
export const ACTIVE_CONNECTION_BUTTON = 'ACTIVE_CONNECTION_BUTTON';
export const activeConnectionButton = () => ({
  type: ACTIVE_CONNECTION_BUTTON,
});

/** Assign value to townHallId at the first load of app component */
export const SET_TOWNHALL_ID = 'SET_TOWNHALL_ID';
export const setTownHallId = (townHallId) => ({
  type: SET_TOWNHALL_ID,
  townHallId,
});
