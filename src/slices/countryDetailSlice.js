import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL_FOR_USER, USER_GETALL_COUNTRIES, USER_GETALL_STATES } from '../constants/urlConfig';

const initialState = {
    isLoading: false,
    getAllCountries: [],
    getAllStates: []
};
export const getAllCountriesApi = createAsyncThunk('user/getAllCountriesApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GETALL_COUNTRIES, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response.data);
    }
});

export const getAllStatesApi = createAsyncThunk('user/getAllStatesApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GETALL_STATES, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response.data);
    }
});

const customersSlice = createSlice({
    name: 'countriesDataSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            //CASES FOR READING Countries
            .addCase(getAllCountriesApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCountriesApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllCountries = action.payload;
            })
            .addCase(getAllCountriesApi.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllStatesApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllStatesApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllStates = action.payload;
            })
            .addCase(getAllStatesApi.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default customersSlice.reducer;
