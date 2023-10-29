import axios from 'axios';

// import { toggleMenu } from '../actions/menu';
import { eraseReportingFields, SUBMIT_REPORTING } from '../actions/reporting';
import {
  getAdminReports,
  getReports,
  GET_REPORTS,
  saveReports,
} from '../actions/reports';
import { loading, setMessage } from '../actions/utilities';

/** Instance of axios with options */
const instance = axios.create({
  baseURL: 'http://localhost:3030',
});

const api = (store) => (next) => (action) => {
  const { townHallId } = store.getState().login;
  switch (action.type) {
    case GET_REPORTS:
      store.dispatch(loading(true));
      instance.get(`/reporting/${townHallId}`)
        .then((response) => {
          /** success of get request
           * @saveReports save reports to state value
           */
          store.dispatch(saveReports(response.data));
        })
        .catch(() => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage('Les données concernant les signalements ne sont pas pour le moment disponible', false));
        })
        .finally(() => {
          /** after success action
           * @loading stop the loadng status of the element
           */
          store.dispatch(loading(false));
        });
      break;
    case SUBMIT_REPORTING:
      instance.post(`/reporting/${townHallId}`, {
        reporting_category: action.reporting_category,
        title: action.reporting_title,
        description: action.reporting_description,
        email: action.reporting_email,
        firstname: action.reporting_firstName,
        lastname: action.reporting_lastName,
        phonenumber: action.reporting_phone,
        town_hall_id: townHallId,
      })
        .then(() => {
          /** success of get request
           * @eraseReportingFields reset field content of reporting component
           * @setMessage set a success message
           */
          store.dispatch(eraseReportingFields());
          store.dispatch(setMessage('Votre signalement a été envoyé à l\'équipe municipale, il sera traité dès que possible', true));
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        })
        .finally(() => {
          store.dispatch(getReports());
        });
      break;
    default:
      next(action);
  }
};

export default api;
