import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { successPNotify, warningPNotify, errorPNotify } from '../components/alertMsg';
import { BASE_URL_FOR_USER, CHANGE_USER_PASSWORD, FORGOT_USER_PASSWORD, LOGIN_USER, REGISTER_USER } from '../constants/urlConfig';
import history from '../history';

const initialState = {
    isLoading: false,
    registerData: {},
    loginData: {},
    isLogin: false,
    forgotPasswordData: {},
    changePasswordData: {}
};

export const registerUser = createAsyncThunk('register/user', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + REGISTER_USER, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        response?.data?.status ? successPNotify(response?.data?.message) : warningPNotify(response?.data?.message);
        console.log(response?.data);
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response);
    }
});

export const loginUser = createAsyncThunk('login/user', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + LOGIN_USER, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        response?.data?.status ? successPNotify(response?.data?.message) : errorPNotify(response?.data?.message);

        if (response?.data?.status) {
            console.log(response?.data);
            localStorage.setItem('authToken', response?.data?.token);
            history.push('/dashboard');
            return response?.data?.data;
        } else {
            return response?.data?.data;
        }
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response);
    }
});

export const UserForgotPassword = createAsyncThunk('user/UserForgotPassword', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL_FOR_USER + FORGOT_USER_PASSWORD, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        response?.data?.status ? successPNotify(response?.data?.message) : warningPNotify(response?.data?.message);
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response?.data?.message);
    }
});

export const UserChangePassword = createAsyncThunk('user/UserChangePassword', async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL_FOR_USER + CHANGE_USER_PASSWORD}${payload._id}`, payload, {
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });

        response?.data?.status ? successPNotify(response?.data?.message) : warningPNotify(response?.data?.message);
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return rejectWithValue(error.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.registerData = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loginData = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(UserForgotPassword.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(UserForgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.forgotPasswordData = action.payload;
            })
            .addCase(UserForgotPassword.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(UserChangePassword.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(UserChangePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.changePasswordData = action.payload;
            })
            .addCase(UserChangePassword.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { setIsLogin } = authSlice.actions;
export default authSlice.reducer;
