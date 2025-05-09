import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from '../api/axios';
export const signup=createAsyncThunk('auth/signup',async({name,email,password},{rejectWithValue})=>{
  try {
    const response = await axiosInstance.post('signup', { name, email, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
      const response = await axiosInstance.post('login', { email, password });
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
      const response = await axiosInstance.get('user');
      return response.data;
  } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response.data || 'Failed to fetch user');
  }
});


const authSlice=createSlice({
  name:'auth',
  initialState:{
    user:null,
    token: localStorage.getItem('token') || null,
    loading:false,
    error:null
  },
  reducers:{
   logout:(state)=>{
      state.user=null;
      state.token=null;
      localStorage.removeItem('token');
    },
   
  },
  extraReducers:(builder)=>{
      builder
            .addCase(signup.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(signup.fulfilled,(state,action)=>{
                  state.loading=false;
                  state.token=action.payload.access_token;
                  state.user=action.payload.user;
                  localStorage.setItem('token', action.payload.access_token);
            })
            .addCase(signup.rejected, (state) => {
                  state.loading = false;
            });

      builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.access_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            });
            
      builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.token = null;
                state.user = null;
                state.error = action.payload;
            });
  }
  
});
export const { logout,clearError } = authSlice.actions;
export default authSlice.reducer;
