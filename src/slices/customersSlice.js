//PACKAGE IMPORTS
import axios from 'axios';
// REDUX-TOOLKIT IMPORTS
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//CUSTOM OR COMPONENTS IMPORTS
import { errorPNotify, successPNotify, warningPNotify } from '../components/alertMsg';

//API ENDPOINTS FOR CUSTOMER
import {
    BASE_URL_FOR_USER,
    USER_CREATE_CUSTOMER,
    USER_DELETE_CUSTOMER,
    USER_GET_ALL_CUSTOMERS,
    USER_GET_CUSTOMER_BYID,
    USER_UPDATE_CUSTOMER,
    USER_UPLOAD_CUSTOMER_CSV
} from '../constants/urlConfig';

//INITIAL STATES
const initialState = {
    getAllCustomers: [],
    isLoading: false,
    createCustomer: {},
    deleteCustomer: {},
    updateCustomer: {},
    getSingleCustomerData: {},
    customerUploadCsvData: []
};

//APICALL FOR CREATING CUSTOMER USING THUNK
export const createCustomerApi = createAsyncThunk('user/createCustomer', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_CUSTOMER, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        successPNotify('Customer Added Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

//APICALL FOR READING CUSTOMER USING THUNK
export const getAllCustomersApi = createAsyncThunk('user/getAllCustomers', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GET_ALL_CUSTOMERS}/${payload?._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data?.statusCode === 422 ? [] : null);
        if (error?.response?.data?.statusCode === 422) {
            return [];
        }
        return rejectWithValue(error.response.data);
    }
});

//APICALL FOR UPDATING CUSTOMER USING THUNK
export const updateCustomerApi = createAsyncThunk('user/updateCustomer', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_CUSTOMER}${payload._id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        successPNotify('Customer Updated Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

//APICALL FOR DELETING CUSTOMER USING THUNK
export const deleteCustomerApi = createAsyncThunk('user/deleteCustomer', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_CUSTOMER}${del_id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        successPNotify('Customer Deleted Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

export const getCustomerById = createAsyncThunk('user/getCustomerById', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GET_CUSTOMER_BYID}${payload._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const customerUploadCsv = createAsyncThunk('user/customerUploadCsv', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_UPLOAD_CUSTOMER_CSV, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        response?.data?.status ? successPNotify('Customer Uploaded Successfully') : errorPNotify('Customer Already Added');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

//CUSTOMER SLICE
const customersSlice = createSlice({
    name: 'customerSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            //CASES FOR CREATING CUSTOMER
            .addCase(createCustomerApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCustomerApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createCustomer = action.payload;
            })
            .addCase(createCustomerApi.rejected, (state) => {
                state.isLoading = false;
            })
            //CASES FOR READING CUSTOMERS
            .addCase(getAllCustomersApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCustomersApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllCustomers = action.payload;
            })
            .addCase(getAllCustomersApi.rejected, (state) => {
                state.isLoading = false;
            })
            //CASES FOR UPDATING CUSTOMER
            .addCase(updateCustomerApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCustomerApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateCustomer = action.payload;
            })
            .addCase(updateCustomerApi.rejected, (state) => {
                state.isLoading = false;
            })
            //CASES FOR DELETING CUSTOMER
            .addCase(deleteCustomerApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCustomerApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteCustomer = action.payload;
            })
            .addCase(deleteCustomerApi.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getCustomerById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleCustomerData = action.payload;
            })
            .addCase(getCustomerById.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(customerUploadCsv.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(customerUploadCsv.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customerUploadCsvData = action.payload;
            })
            .addCase(customerUploadCsv.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default customersSlice.reducer;
