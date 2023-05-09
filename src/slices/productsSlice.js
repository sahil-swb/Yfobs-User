//PACKAGE IMPORTS
import axios from 'axios';
// REDUX-TOOLKIT IMPORTS
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//CUSTOM OR COMPONENTS IMPORTS
import { errorPNotify, successPNotify, warningPNotify } from '../components/alertMsg';

//API ENDPOINTS FOR PRODUCT
import {
    BASE_URL_FOR_USER,
    USER_CREATE_PRODUCTS,
    USER_DELETE_PRODUCTS,
    USER_GETBYID_PRODUCTS,
    USER_GET_ALL_PRODUCTS,
    USER_UPDATE_PRODUCTS
} from '../constants/urlConfig';

//INITIAL STATES
const initialState = {
    isLoading: false,
    getAllProducts: [],
    updateData: {},
    deleteData: {},
    createData: [],
    getEstimateProducts: [],
    getSingleProduct: {}
};

//APICALL FOR CREATING PRODUCT USING THUNK
export const createProductApi = createAsyncThunk('user/createProduct', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_PRODUCTS, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        successPNotify('Product Added Successfully');
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response);
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

//APICALL FOR READING PRODUCTS USING THUNK
export const getAllProductsApi = createAsyncThunk('user/getAllProducts', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL_FOR_USER + USER_GET_ALL_PRODUCTS}/${payload?._id}`, payload?.payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});

//APICALL FOR UPDATING PRODUCTS USING THUNK
export const updateProductApi = createAsyncThunk('user/updateProduct', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_PRODUCTS}${payload._id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        successPNotify('Product Updated Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

//APICALL FOR DELETING PRODUCTS USING THUNK
export const deleteProductApi = createAsyncThunk('user/deleteProduct', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_PRODUCTS}${del_id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        successPNotify('Product Deleted Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

export const getSingleProductApi = createAsyncThunk('user/getSingleProductApi', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GETBYID_PRODUCTS}${payload._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        successPNotify('Product Fetched Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

//PRODUCT SLICE
const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            //CASES FOR CREATING PRODUCT
            .addCase(createProductApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createProductApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createData = action.payload;
            })
            .addCase(createProductApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //CASES FOR READING PRODUCT
            .addCase(getAllProductsApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllProductsApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllProducts = action.payload;
            })
            .addCase(getAllProductsApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //CASES FOR UPDATING PRODUCT
            .addCase(updateProductApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateProductApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateData = action.payload;
            })
            .addCase(updateProductApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //CASES FOR DELETING PRODUCT
            .addCase(deleteProductApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteProductApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteData = action.payload;
            })
            .addCase(deleteProductApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getSingleProductApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSingleProductApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleProduct = action.payload;
                state.getEstimateProducts.push(action.payload);
            })
            .addCase(getSingleProductApi.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default productsSlice.reducer;
