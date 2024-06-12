import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  isLoading: false,
  data: null,
  isSuccess: false,
  error: null,
  isUpdated:false
};

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_,thunkAPI) => {
    try {
        const data =  await adminService.getUsers();
        return data;
    } catch (error) {
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
        )||error.message||error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeUser = createAsyncThunk('admin/removeUser',async(id,thunkAPI)=>{
    try {
        const data =  await adminService.removeUser(id);
        return data;
    } catch (error) {
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
        )||error.message||error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserDetials = createAsyncThunk('admin/getUser',async(id,thunkAPI)=>{
    try {
        const data = await adminService.getUser(id);
        return data;
    } catch (error) {
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
        )||error.message||error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const editUserDetails = createAsyncThunk('admin/edit-user',async({id,data},thunkAPI)=>{
    try {
        const response = await adminService.editUser(id,data);
        return response;
    } catch (error) {
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
        )||error.message||error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset:(state)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.error = null;
        state.isUpdated = false;
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
     .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = null;
        state.isSuccess = false;
      })
      .addCase(removeUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(removeUser.rejected,(state,action)=>{
        state.data = null
        state.error = action.payload;
        state.isSuccess = false;
      })
     .addCase(getUserDetials.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(editUserDetails.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(editUserDetails.fulfilled,(state)=>{
        state.isLoading = false;
        state.isUpdated = true;
      })
      .addCase(editUserDetails.rejected,(state,action)=>{
        state.isLoading =false;
        state.isSuccess = false;
        state.error = action.payload;
      })
  },
});

export const {reset} = adminSlice.actions;
export default adminSlice.reducer;
