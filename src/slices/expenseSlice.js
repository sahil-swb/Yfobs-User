import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    BASE_URL_FOR_USER,
    USER_CREATE_EXPENSE,
    USER_DELETE_EXPENSE,
    USER_GETALL_EXPENSES,
    USER_GET_SINGLE_EXPENSE,
    USER_UPDATE_EXPENSE
} from '../constants/urlConfig';

const initialState = {
    isLoading: false,
    createExpenseData: {},
    getAllExpenseData: [],
    updateExpenseData: {},
    deleteExpenseData: {},
    getSingleExpenseData: {}
};

export const createExpense = createAsyncThunk('expense/createExpense', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = axios.post(BASE_URL_FOR_USER + USER_CREATE_EXPENSE, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const getAllExpenses = createAsyncThunk('expense/getAllExpenses', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL_FOR_USER + USER_GETALL_EXPENSES, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const updateExpense = createAsyncThunk('expense/updateExpense', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = axios.put(`${BASE_URL_FOR_USER + USER_UPDATE_EXPENSE}${payload?._id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const deleteExpense = createAsyncThunk('expense/deleteExpense', async ({ del_id }, { rejectWithValue }) => {
    try {
        const response = axios.delete(`${BASE_URL_FOR_USER + USER_DELETE_EXPENSE}${del_id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const getSingleExpense = createAsyncThunk('expense/getSingleExpense', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = axios.get(`${BASE_URL_FOR_USER + USER_GET_SINGLE_EXPENSE}${payload?._id}`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

const expenseSlice = createSlice({
    name: 'expenseSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            //CREATE DATA
            .addCase(createExpense.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createExpenseData = action.payload;
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.isLoading = false;
            })
            //GET ALL DATA
            .addCase(getAllExpenses.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllExpenses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllExpenseData = action.payload;
            })
            .addCase(getAllExpenses.rejected, (state, action) => {
                state.isLoading = false;
            })
            //UPDATE DATA
            .addCase(updateExpense.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateExpenseData = action.payload;
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.isLoading = false;
            })
            //DELETE DATA
            .addCase(deleteExpense.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteExpenseData = action.payload;
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.isLoading = false;
            })
            //GET SINGLE DATA
            .addCase(getSingleExpense.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSingleExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getSingleExpenseData = action.payload;
            })
            .addCase(getSingleExpense.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export default expenseSlice.reducer;
