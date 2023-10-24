/** Management to redirect route */
export const REDIRECT = 'REDIRECT';
export const redirect = (route) => ({
  type: REDIRECT,
  redirectTo: route,
});

/** Controlled field for Field component */
export const CHANGE_CURRENT_FIELD = 'CHANGE_CURRENT_FIELD';
export const changeCurrentField = (value, key) => ({
  type: CHANGE_CURRENT_FIELD,
  value: value,
  key: key,
});

/** Erase email and password state */
export const ERASE_EMAIL_PASSWORD_STATE = 'ERASE_EMAIL_PASSWORD_STATE';
export const eraseEmailPasswordState = () => ({
  type: ERASE_EMAIL_PASSWORD_STATE,
});

/** Controlled dropdown for category of reporting */
export const CHANGE_CURRENT_CATEGORY = 'CHANGE_CURRENT_CATEGORY';
export const changeCurrentCategory = (value) => ({
  type: CHANGE_CURRENT_CATEGORY,
  reporting_category: value,
});

/** Loading waitind data from API */
export const LOADING = 'LOADING';
export const loading = (value) => ({
  type: LOADING,
  value: value,
});

/** Return a error or success message */
export const SET_MESSAGE = 'SET_MESSAGE';
export const setMessage = (message, color) => ({
  type: SET_MESSAGE,
  message: message,
  messageColor: color,
});
