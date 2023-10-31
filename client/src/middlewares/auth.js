import axios from 'axios';

import {
  SUBMIT_LOGIN,
  SUBMIT_SIGNUP,
  toggleLogin,
  activeConnectionButton,
  login,
  LOGOUT,
  setLogout,
  setTownHallId,
} from '../actions/login';

import { redirect, setMessage, eraseEmailPasswordState } from '../actions/utilities';

/** Instance of axios with options */
const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
  },
});

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP:
      instance.post('/signup', {
        pseudo: action.pseudo,
        email: action.email,
        password: action.password,
        insee: action.inseeCode,
      })
        .then((response) => {
          /** success of post request
           * @toggleLogin open connection form
           * @activeConnectionButton active connection button
           * @setMessage set a success message
           */
          store.dispatch(toggleLogin());
          store.dispatch(activeConnectionButton());
          store.dispatch(setMessage(response.data, true));
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        });
      break;
    case SUBMIT_LOGIN:
      instance.post('/login', {
        email: action.email,
        password: action.password,
      })
        .then((response) => {
          /** success of post request
           * @login change value state login
           * @redirect redirect to value
           */
          store.dispatch(login());
          store.dispatch(setTownHallId(response.data.townHallId));
          store.dispatch(redirect('/admin'));
          store.dispatch(eraseEmailPasswordState());

          // Delete token if one already exists
          if (localStorage.getItem('accessToken') !== 'null') {
            localStorage.removeItem('accessToken');
          }

          // Save token to localStorage
          const { accessToken } = response.data;
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          localStorage.setItem('accessToken', accessToken);
          window.location.reload(false);
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        });
      break;
    case LOGOUT: {
      /** On logout
       * @delete delete token from intance and localstorage
       * @setLogout change state value login
       * @setMessage set a success message
       */
      delete instance.defaults.headers.common.Authorization;
      localStorage.removeItem('accessToken');

      store.dispatch(setLogout());
      store.dispatch(setMessage('Vous êtes déconnecté', true));
      // navigate('/');
      break;
    }
    default:
      next(action);
  }
};

export default auth;
