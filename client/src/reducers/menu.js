import { TOGGLE_MENU } from '../actions/menu';

export const initialState = {
  isOpen: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /** Display Menu component on clicking menu button */
    case TOGGLE_MENU: {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }
    default:
      return state;
  }
};

export default reducer;
