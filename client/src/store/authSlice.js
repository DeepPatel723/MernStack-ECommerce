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
                headers: {
                    'Content-Type': 'application/json',
                  },
            }
        );

        return response.data;
    }
)

// export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', userData);
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error("Server responded with an error:", error.response.data); // Log server's error message
//         return rejectWithValue(error.response.data); // Return server's error to the reducer
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response received from server:", error.request);
//         return rejectWithValue("No response from server");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error during request setup:", error.message);
//         return rejectWithValue(error.message);
//       }
//     }
//   });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state, action) => {},
    },
    extraReducers:(builer) => {
        builer
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;