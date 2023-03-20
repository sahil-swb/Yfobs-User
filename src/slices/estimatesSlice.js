import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { USER_CREATE_ESTIMATES, USER_DELETE_ESTIMATES, USER_GET_ALL_ESTIMATES, USER_UPDATE_ESTIMATES } from '../constants/UrlConfig';

const initialState = {
    isLoading: false,
    getAllEstimates: [],
    createEstimate: []
};

export const createEstimateApi = createAsyncThunk('user/createEstimate', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + USER_CREATE_ESTIMATES, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error?.response?.data);
    }
});

export const getAllEstimatesApi = createAsyncThunk('user/getAllEstimates', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GET_ALL_ESTIMATES, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const updateEstimateApi = createAsyncThunk('user/updateEstimate', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_ESTIMATES}${payload.id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.message);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const deleteEstimateApi = createAsyncThunk('user/deleteEstimate', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_ESTIMATES}${del_id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.message);
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response);
    }
});

const estimatesSlice = createSlice({
    name: 'estimates',
    initialState,
    extraReducers: (builder) => {
        builder
            //CREATE
            .addCase(createEstimateApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createEstimateApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createEstimate = action.payload;
            })
            .addCase(createEstimateApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //READ
            .addCase(getAllEstimatesApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllEstimatesApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllEstimates = action.payload;
            })
            .addCase(getAllEstimatesApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //UPDATE
            .addCase(updateEstimateApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateEstimateApi.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateEstimateApi.rejected, (state, action) => {
                state.isLoading = false;
            })
            //DELETE
            .addCase(deleteEstimateApi.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteEstimateApi.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteEstimateApi.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default estimatesSlice.reducer;
