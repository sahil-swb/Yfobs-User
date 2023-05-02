import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    BASE_URL_FOR_USER,
    USER_CREATE_INVOICE,
    USER_DELETE_INVOICE,
    USER_GETALL_INVOICES,
    USER_GET_SINGLE_INVOICE,
    USER_UPDATE_INVOICE
} from '../constants/urlConfig';

const initialState = {
    isLoading: false,
    createInvoice: {},
    getAllInvoices: [],
    updateInvoice: {},
    deleteInvoice: {},
    getSingleInvoice: {}
};

export const setCreateInvoice = createAsyncThunk('user/setCreateInvoice', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_INVOICE, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const setGetAllInvoices = createAsyncThunk('user/setGetAllInvoices', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_GETALL_INVOICES, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const setGetSingleInvoice = createAsyncThunk('user/setGetSingleInvoice', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GET_SINGLE_INVOICE}${payload._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const setUpdateInvoice = createAsyncThunk('user/setUpdateInvoice', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_INVOICE}${payload._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const setDeleteInvoice = createAsyncThunk('user/setDeleteInvoice', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_INVOICE}${del_id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

const invoiceSlice = createSlice({
    name: 'invoiceSlice',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            //CREATE
            .addCase(setCreateInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setCreateInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createInvoice = action.payload;
            })
            .addCase(setCreateInvoice.rejected, (state, action) => {
                state.isLoading = false;
            })
            //READ
            .addCase(setGetAllInvoices.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setGetAllInvoices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllInvoices = action.payload;
            })
            .addCase(setGetAllInvoices.rejected, (state, action) => {
                state.isLoading = false;
            })
            //UPDATE
            .addCase(setUpdateInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setUpdateInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateInvoice = action.payload;
            })
            .addCase(setUpdateInvoice.rejected, (state, action) => {
                state.isLoading = false;
            })
            //DELETE
            .addCase(setDeleteInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setDeleteInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteInvoice = action.payload;
            })
            .addCase(setDeleteInvoice.rejected, (state, action) => {
                state.isLoading = false;
            })
            //GETBYID
            .addCase(setGetSingleInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setGetSingleInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleInvoice = action.payload;
            })
            .addCase(setGetSingleInvoice.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default invoiceSlice.reducer;
