import axios from 'axios';
import {
  DELETE_COUNCIL_MEMBERS,
  getCouncilMembers,
  GET_COUNCIL_MEMBERS, PATCH_COUNCIL_MEMBERS, POST_COUNCIL_MEMBERS, setCouncilMembers,
} from '../actions/council';
import { setMessage } from '../actions/utilities';

/** Instance of axios with options */
const instance = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const councilApi = (store) => (next) => (action) => {
  const { townHallId } = store.getState().login;
  switch (action.type) {
    case GET_COUNCIL_MEMBERS:
      instance.get(`/council/${townHallId}`)
        .then((response) => {
          /** success of get request
           * @setCouncilMembers save member to state value
           */
          store.dispatch(setCouncilMembers(response.data));
        })
        .catch(() => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage('Les données concernant les membres du conseil ne sont pas pour le moment disponible', false));
        });
      break;
    case POST_COUNCIL_MEMBERS:
      instance.post(`/admin/council/${townHallId}`, {
        first_name: 'Prénom',
        last_name: 'Nom',
        photo: 'https://react.semantic-ui.com/images/wireframe/image.png',
        role: 'Fonction',
        town_hall_id: townHallId,
      })
        .then(() => {
          /** success of post request
           * @getCouncilMembers get new member list to state value
           */
          store.dispatch(getCouncilMembers());
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        });
      break;
    case PATCH_COUNCIL_MEMBERS:
      instance.patch(`/admin/council/${townHallId}/${action.id}`, {
        first_name: action.firstName,
        last_name: action.lastName,
        photo: action.photo,
        role: action.role,
        town_hall_id: townHallId,
      })
        .then(() => {
          /** success of patch request
           * @getCouncilMembers get new member list to state value
           */
          store.dispatch(getCouncilMembers());
        })
        .catch((error) => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage(error.response.data.error.message, false));
        });
      break;
    case DELETE_COUNCIL_MEMBERS:
      instance.delete(`/admin/council/${townHallId}/${action.id}`)
        .then(() => {
          /** success of delete request
           * @getCouncilMembers get new member list to state value
           */
          store.dispatch(getCouncilMembers());
        })
        .catch(() => {
          /** error on request
           * @setMessage set a message error
           */
          store.dispatch(setMessage('Les modifications concernant les signalements ne sont pas possible pour le moment', false));
        });
      break;
    default:
      next(action);
  }
};

export default councilApi;
