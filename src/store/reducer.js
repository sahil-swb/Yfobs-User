import { combineReducers } from 'redux';
import { createSelectorHook } from 'react-redux';
import ableReducer from './ableReducer';
import demoReducer from './demoReducer';
import customersSlice from '../slices/customersSlice';
import modalSlice from '../slices/modalSlice';
import categoriesSlice from '../slices/categoriesSlice';
import productsSlice from '../slices/productsSlice';
import authSlice from '../slices/authSlice';
import estimatesSlice from '../slices/estimatesSlice';

const reducer = combineReducers({
    able: ableReducer,
    demo: demoReducer,
    customers: customersSlice,
    modalReducer: modalSlice,
    categoriesReducer: categoriesSlice,
    productsReducer: productsSlice,
    authReducer: authSlice,
    estimateReducer: estimatesSlice
});
export const useSelector = createSelectorHook();
export default reducer;
