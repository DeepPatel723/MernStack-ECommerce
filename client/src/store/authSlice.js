import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (fromData) => {
        const response = await axios.post("http://localhost:5000/api/auth/register",
            fromData,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state, action) => {},
    },
    extraReducers:(builer) => {
        builer
        .addCase(registerUSer.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerUSer.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(registerUSer.rejected,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;