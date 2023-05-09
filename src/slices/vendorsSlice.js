import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    BASE_URL_FOR_USER,
    USER_CREATE_VENDOR,
    USER_DELETE_VENDOR,
    USER_GETALL_VENDORS,
    USER_GET_SINGLE_VENDOR,
    USER_UPDATE_VENDOR
} from '../constants/urlConfig';
import { errorPNotify, successPNotify } from '../components/alertMsg';

const initialState = {
    isLoading: false,
    createVendorData: {},
    getAllVendorData: [],
    updateVendorData: {},
    deleteVendorData: {},
    getSingleVendorData: {}
};

export const createVendor = createAsyncThunk('vendors/createVendor', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_VENDOR, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        successPNotify('Vendor Created Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const getAllVendors = createAsyncThunk('vendors/getAllVendors', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GETALL_VENDORS}/${payload?._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateVendor = createAsyncThunk('vendors/updateVendor', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_VENDOR}${payload?._id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        successPNotify('Vendor Updated Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

export const deleteVendor = createAsyncThunk('vendors/deleteVendor', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(BASE_URL_FOR_USER + USER_DELETE_VENDOR + del_id, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        successPNotify('Vendor Deleted Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

export const getSingleVendor = createAsyncThunk('vendors/getSingleVendor', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GET_SINGLE_VENDOR}${payload?._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const vendorsSlice = createSlice({
    name: 'vendorsSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            //CREATE VENDOR
            .addCase(createVendor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createVendorData = action.payload;
            })
            .addCase(createVendor.rejected, (state, action) => {
                state.isLoading = false;
            })
            //GETALL VENDORS
            .addCase(getAllVendors.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllVendors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllVendorData = action.payload;
            })
            .addCase(getAllVendors.rejected, (state, action) => {
                state.isLoading = false;
            })
            //UPDATE VENDOR
            .addCase(updateVendor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateVendorData = action.payload;
            })
            .addCase(updateVendor.rejected, (state, action) => {
                state.isLoading = false;
            })
            //DELETE VENDOR
            .addCase(deleteVendor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteVendorData = action.payload;
            })
            .addCase(deleteVendor.rejected, (state, action) => {
                state.isLoading = false;
            })
            //GET SINGLE VENDOR
            .addCase(getSingleVendor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSingleVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleVendorData = action.payload;
            })
            .addCase(getSingleVendor.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default vendorsSlice.reducer;
