import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import React from 'react';
import {
    BASE_URL_FOR_USER,
    USER_CREATE_BUSINESS,
    USER_GET_ALL_BUSINESS,
    USER_UPLOAD_LOGO,
    USER_UPLOAD_UPIQRCODE
} from '../constants/urlConfig';

const initialState = {
    isLoading: false,
    createBusiness: {},
    updateBusiness: {},
    getAllBusinessesData: [],
    logoData: '',
    upiQRData: ''
};

export const createBusinessesApi = createAsyncThunk('createBusinessApi', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_BUSINESS, payload, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const getAllBusinessesApi = createAsyncThunk('getAllBusinessesApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GET_ALL_BUSINESS, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const uploadLogoApi = createAsyncThunk('uploadLogoApi', async ({ payloadImage }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_UPLOAD_LOGO, payloadImage, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const uploadUpiQRCodeApi = createAsyncThunk('uploadUpiQRCodeApi', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_UPLOAD_UPIQRCODE, payload, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

const settingsSlice = () =>
    createSlice({
        name: 'settingsSlice',
        initialState,
        extraReducers: (builder) => {
            builder
                .addCase(createBusinessesApi.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(createBusinessesApi.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.createBusiness = action.payload;
                })
                .addCase(createBusinessesApi.rejected, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(getAllBusinessesApi.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(getAllBusinessesApi.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.getAllBusinessesData = action.payload;
                })
                .addCase(getAllBusinessesApi.rejected, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(uploadLogoApi.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(uploadLogoApi.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.logoData = action.payload;
                })
                .addCase(uploadLogoApi.rejected, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(uploadUpiQRCodeApi.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(uploadUpiQRCodeApi.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.logoData = action.payload;
                })
                .addCase(uploadUpiQRCodeApi.rejected, (state, action) => {
                    state.isLoading = false;
                });
        }
    });

export default settingsSlice.reducer;
