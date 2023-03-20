// REDUX-TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

//INITIAL STATES
const initialState = {
    deleteModal: false,
    modalIsOpen: false,
    modalType: ''
};

//MODAL SLICE
const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        commonModalIsOpen: (state, action) => {
            state.modalIsOpen = action.payload;
        },
        commonDeleteModal: (state, action) => {
            state.deleteModal = action.payload;
        },
        commonModalType: (state, action) => {
            state.modalType = action.payload;
        }
    }
});

export const { commonModalIsOpen, commonDeleteModal, commonModalType } = modalSlice.actions;
export default modalSlice.reducer;
