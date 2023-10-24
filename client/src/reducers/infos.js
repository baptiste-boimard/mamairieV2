import { TOGGLE_RECYCLING, TOGGLE_WASTE } from '../actions/infos';

export const initialState = {
  isOpenWaste: false,
  isOpenRecycling: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /** Display waste information */
    case TOGGLE_WASTE:
      return {
        ...state,
        isOpenWaste: !state.isOpenWaste,
      };

    /** Display waste landfill information */
    case TOGGLE_RECYCLING:
      return {
        ...state,
        isOpenRecycling: !state.isOpenRecycling,
      };
    default:
      return state;
  }
};

export default reducer;
