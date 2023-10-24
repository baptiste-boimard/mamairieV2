import { LOGIN, SET_LOGOUT } from '../actions/login';
import {
  CREATE_EDITING_MEMBER_FIRSTNAME,
  CREATE_EDITING_MEMBER_LASTNAME,
  CREATE_EDITING_MEMBER_PHOTO,
  CREATE_EDITING_MEMBER_ROLE,
} from '../actions/council';
import { CHANGE_CURRENT_CHECKBOX_REPORTING, ERASE_REPORTING_FIELDS } from '../actions/reporting';
import {
  CHANGE_CURRENT_CATEGORY,
  CHANGE_CURRENT_FIELD,
  LOADING,
  // RETURN_MESSAGE_ERROR,
  // RETURN_MESSAGE_SUCCESS,
  SET_MESSAGE,
  ERASE_EMAIL_PASSWORD_STATE,
} from '../actions/utilities';

export const initialState = {
  pseudo: '',
  email: '',
  password: '',
  confirmPassword: '',
  inseeCode: '',
  redirectTo: '',
  reporting_title: '',
  reporting_description: '',
  reporting_email: '',
  reporting_firstName: '',
  reporting_lastName: '',
  reporting_phone: '',
  reporting_checkBox: false,
  reporting_error: false,
  handleFieldChange: '',
  admin_text: '',
  reporting_statut: '',
  loading: false,
  errorMessage: false,
  successMessage: false,
  councilEditingName: '',
  councilEditingRole: '',
  message: '',
  messageColor: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /** Controlled field for Field component */
    case CHANGE_CURRENT_FIELD:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Erase email and password state */
    case ERASE_EMAIL_PASSWORD_STATE:
      return {
        ...state,
        email: '',
        password: '',
      };

    /** Controlled dropdown for category of reporting */
    case CHANGE_CURRENT_CATEGORY:
      return {
        ...state,
        reporting_category: action.reporting_category,
      };

    /** Change value logged to false when person disconnected */
    case SET_LOGOUT:
      return {
        ...state,
        pseudo: '',
        inseeCode: '',
      };

    /** Change value logged to true when person logged */
    case LOGIN:
      return {
        ...state,
        email: '',
        password: '',
        confirmPassword: '',
      };

    /** Erase fields of Reporting on succes submit */
    case ERASE_REPORTING_FIELDS:
      return {
        ...state,
        reporting_category: '',
        reporting_title: '',
        reporting_description: '',
        reporting_email: '',
        reporting_firstName: '',
        reporting_lastName: '',
        reporting_phone: '',
        reporting_checkBox: false,
        reporting_error: false,

      };

    /** Controlled field for checkbox reporting */
    case CHANGE_CURRENT_CHECKBOX_REPORTING:
      return {
        ...state,
        reporting_checkBox: !state.reporting_checkBox,
      };

    /** Loading waitind data from API */
    case LOADING:
      return {
        ...state,
        loading: action.value,
      };

    /** Create a specific pair key/value to council reducer to change one member lastname */
    case CREATE_EDITING_MEMBER_LASTNAME:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Create a specific pair key/value to council reducer to change one member firstname */
    case CREATE_EDITING_MEMBER_FIRSTNAME:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Create a specific pair key/value to council reducer to change one member role */
    case CREATE_EDITING_MEMBER_ROLE:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Create a specific pair key/value to council reducer to change one member photo */
    case CREATE_EDITING_MEMBER_PHOTO:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Return a error or success message */
    case SET_MESSAGE: {
      return {
        ...state,
        message: action.message,
        messageColor: action.messageColor,
      };
    }
    default:
      return state;
  }
};

export default reducer;
