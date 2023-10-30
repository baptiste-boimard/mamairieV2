import axios from 'axios';

import {
  // deleteReport,
  DELETE_SELECTED_REPORT,
  getAdminReports,
  GET_ADMIN_REPORTS,
  saveAdminReports,
  SUBMIT_MODERATE_REPORTING,
} from '../actions/reports';
import { loading, setMessage } from '../actions/utilities';

/** Instance of axios with options */
const instance = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const adminApi = (store) => (next) => (action) => {
  const { townHallId } = store.getState().login;
  switch (action.type) {
    case GET_ADMIN_REPORTS:
      instance.get(`/admin/reporting/${townHallId}`)
        .then((response) => {
          /** success of get request
           * @saveAdminReports save admin reports to state value
           */
          store.dispatch(saveAdminReports(response.data));
        })

        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage('coucou', error.response.data.error.message, false));
        })
        .finally(() => {
          /** after success action
           * @loading stop the loadng status of the element
           */
          store.dispatch(loading(false));
        });
      break;
    case DELETE_SELECTED_REPORT: {
      instance.delete(`/admin/reporting/${townHallId}/${action.id}`)
        .then((response) => {
          /** success of get request
           * @getAdminReports get new reports list to state value
           * @setMessage set a success message
           */
          store.dispatch(getAdminReports());
          store.dispatch(setMessage(response.data, true));
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        });
      break;
    }
    case SUBMIT_MODERATE_REPORTING: {
      instance.patch(`/admin/reporting/${townHallId}/${action.id}`, {
        title: action.title,
        admin_text: action.admin_text,
        reporting_statut: action.reporting_statut,
      })
        .then((response) => {
          /** success of get request
           * @setMessage set a success message
           * @getAdminReports get request to API to have update list of admin reports
           */
          store.dispatch(setMessage(response.data, true));
          store.dispatch(getAdminReports());
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        });
      break;
    }
    default:
      next(action);
  }
};

export default adminApi;
