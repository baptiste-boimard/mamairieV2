import {
  ADD_COUNCIL_MEMBERS,
  CREATE_EDITING_MEMBER,
  SET_COUNCIL_MEMBERS,
  TOGGLE_EDITING_MEMBER,
} from '../actions/council';

export const initialState = {
  councilMembers: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /** Attribute council members value to state */
    case SET_COUNCIL_MEMBERS:
      return {
        ...state,
        councilMembers: action.councilMembers,
      };
    // Add a new council member to council page
    case ADD_COUNCIL_MEMBERS:
      return {
        ...state,
        councilMembers: [...state.councilMembers,
          {
            first_name: 'Prénom',
            last_name: 'Nom',
            photo: 'https://react.semantic-ui.com/images/wireframe/image.png',
            role: 'Fonction',
            town_hall_id: 1,
            town_hall_staff_id: '',
          },
        ],
      };

    /** Create a specific pair key/value to council reducer to open specically one member to edit */
    case CREATE_EDITING_MEMBER:
      return {
        ...state,
        [action.name]: false,
      };

    // Open council member editing menu
    case TOGGLE_EDITING_MEMBER:
      return {
        ...state,
        [action.name]: !state[action.name],
      };

      // /** Create a specific pair key/value to council reducer to change one member lastname */
      // case CREATE_EDITING_MEMBER_LASTNAME:
      //   return {
      //     ...state,
      //     [action.key]: action.value,
      //   };

      // /** Create a specific pair key/value to council reducer to change one member firstname */
      // case CREATE_EDITING_MEMBER_FIRSTNAME:
      //   return {
      //     ...state,
      //     [action.key]: action.value,
      //   };

      // /** Create a specific pair key/value to council reducer to change one member role */
      // case CREATE_EDITING_MEMBER_ROLE:
      //   return {
      //     ...state,
      //     [action.key]: action.value,
      //   };

    // /** Create a specific pair key/value to council reducer to change one member photo */
    // case CREATE_EDITING_MEMBER_PHOTO:
    //   return {
    //     ...state,
    //     [action.key]: action.value,
    //   };
    default:
      return state;
  }
};

export default reducer;
