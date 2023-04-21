import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    BASE_URL_FOR_USER,
    USER_CREATE_BUSINESS,
    USER_DELETE_BUSINESS,
    USER_GET_ALL_BUSINESS,
    USER_GET_SINGLE_BUSINESS,
    USER_UPDATE_BUSINESS,
    USER_UPLOAD_LOGO,
    USER_UPLOAD_UPIQRCODE
} from '../constants/urlConfig';
import { errorPNotify, successPNotify } from '../components/alertMsg';

const initialState = {
    isLoading: false,
    createBusiness: {},
    updateBusinessData: {},
    getAllBusinessesData: [],
    logoData: {},
    upiQRData: {},
    getSingleBusinessData: {},
    ID: '',
    deleteBusinessData: {}
};

export const createBusinessesApi = createAsyncThunk('createBusinessApi', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_BUSINESS, payload, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        successPNotify('Created Bussiness Successfully');
        return response?.data?.data;
    } catch (error) {
        errorPNotify(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const getAllBusinessesApi = createAsyncThunk('getAllBusinessesApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GET_ALL_BUSINESS, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const uploadLogoApi = createAsyncThunk('uploadLogoApi', async ({ payloadLogoImage }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${BASE_URL_FOR_USER + USER_UPLOAD_LOGO}${payloadLogoImage?._id ? payloadLogoImage?._id : null}`,
            payloadLogoImage,
            {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        );
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const uploadUpiQRCodeApi = createAsyncThunk('uploadUpiQRCodeApi', async ({ payloadUpiImage }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${BASE_URL_FOR_USER + USER_UPLOAD_UPIQRCODE}${payloadUpiImage?._id ? payloadUpiImage?._id : null}`,
            payloadUpiImage,
            {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        );
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const getSingleBusiness = createAsyncThunk('getSingleBusiness', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL_FOR_USER + USER_GET_SINGLE_BUSINESS}${payload?._id}`, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const updateBusiness = createAsyncThunk('updateBusiness', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_BUSINESS}${payload?._id}`, payload, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const deleteBusiness = createAsyncThunk('deleteBusiness', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_BUSINESS}${payload?._id}`, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

const settingsSlice = createSlice({
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
            })
            .addCase(getSingleBusiness.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSingleBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleBusinessData = action.payload;
            })
            .addCase(getSingleBusiness.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateBusiness.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateBusinessData = action.payload;
            })
            .addCase(updateBusiness.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteBusiness.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteBusinessData = action.payload;
            })
            .addCase(deleteBusiness.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default settingsSlice.reducer;
