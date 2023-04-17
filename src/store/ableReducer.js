import * as actionTypes from './actions';
import config from '../config';
export const initialState = {
    isOpen: [],
    isTrigger: [],
    ...config
};
const ableReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };

        default:
            return state;
    }
};
export default ableReducer;
