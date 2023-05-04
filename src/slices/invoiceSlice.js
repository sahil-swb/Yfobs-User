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
    createInvoiceData: {},
    getAllInvoicesData: [],
    updateInvoiceData: {},
    deleteInvoiceData: {},
    getSingleInvoiceData: {}
};

export const createInvoice = createAsyncThunk('user/setCreateInvoice', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_INVOICE, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const getAllInvoices = createAsyncThunk('user/setGetAllInvoices', async (_, { rejectWithValue }) => {
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

export const getSingleInvoice = createAsyncThunk('user/setGetSingleInvoice', async ({ payload }, { rejectWithValue }) => {
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

export const updateInvoice = createAsyncThunk('user/setUpdateInvoice', async ({ payload }, { rejectWithValue }) => {
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

export const deleteInvoice = createAsyncThunk('user/setDeleteInvoice', async ({ del_id }, { rejectWithValue }) => {
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
            .addCase(createInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createInvoiceData = action.payload;
            })
            .addCase(createInvoice.rejected, (state, action) => {
                state.isLoading = false;
            })
            //READ
            .addCase(getAllInvoices.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllInvoices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllInvoicesData = action.payload;
            })
            .addCase(getAllInvoices.rejected, (state, action) => {
                state.isLoading = false;
            })
            //UPDATE
            .addCase(updateInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateInvoiceData = action.payload;
            })
            .addCase(updateInvoice.rejected, (state, action) => {
                state.isLoading = false;
            })
            //DELETE
            .addCase(deleteInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteInvoiceData = action.payload;
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.isLoading = false;
            })
            //GETBYID
            .addCase(getSingleInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSingleInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleInvoiceData = action.payload;
            })
            .addCase(getSingleInvoice.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default invoiceSlice.reducer;
