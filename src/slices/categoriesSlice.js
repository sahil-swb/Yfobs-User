//PACKAGE IMPORTS
import axios from 'axios';
// REDUX-TOOLKIT IMPORTS
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//CUSTOM OR COMPONENTS IMPORTS
import { errorPNotify, successPNotify, warningPNotify } from '../components/alertMsg';

//API ENDPOINTS FOR CATEGORY
import {
    BASE_URL_FOR_USER,
    USER_CREATE_CATEGORIES,
    USER_DELETE_CATEGORIES,
    USER_GET_ALL_CATEGORIES,
    USER_UPDATE_CATEGORIES
} from '../constants/urlConfig';

//INITIAL STATES
const initialState = {
    isLoading: false,
    getAllData: [],
    updateData: {},
    deleteData: {},
    createData: {}
};

//APICALL FOR CREATING CATEGORY USING THUNK
export const createCategoryApi = createAsyncThunk('user/createCategory', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_CATEGORIES, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        successPNotify('Category Added Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

//APICALL FOR READING CATEGORIES USING THUNK
export const getAllCategoriesApi = createAsyncThunk('user/getAllCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GET_ALL_CATEGORIES, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

//APICALL FOR UPDATING CATEGORY USING THUNK
export const updateCategoryApi = createAsyncThunk('user/updateCategory', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_CATEGORIES}${payload.id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        successPNotify('Category Updated Succesfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response);
    }
});

//APICALL FOR DELETING CATEGORY USING THUNK
export const deleteCategoryApi = createAsyncThunk('user/deleteCategory', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_CATEGORIES}${del_id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        successPNotify('Category Deleted Succesfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response);
    }
});

//CATEGORY SLICE
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder
            //CASES FOR CREATING CATEGORY
            .addCase(createCategoryApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createCategoryApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createData = action.payload;
            })
            .addCase(createCategoryApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //CASES FOR READING CATEGORIES
            .addCase(getAllCategoriesApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllCategoriesApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllData = action.payload;
            })
            .addCase(getAllCategoriesApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //CASES FOR UPDATING CATEGORY
            .addCase(updateCategoryApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateCategoryApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateData = action.payload;
            })
            .addCase(updateCategoryApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //CASES FOR DELETING CATEGORY
            .addCase(deleteCategoryApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteCategoryApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteData = action.payload;
            })
            .addCase(deleteCategoryApi.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});
export default categoriesSlice.reducer;
