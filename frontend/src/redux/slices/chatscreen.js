import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";
const initialState = {
  array: [],
  single: {
    type: "",
    data: {},
  },
};
export const getAllUsers = createAsyncThunk("getAllUsers", async (thunkAPI) => {
  const res = await backend.get("/getAllUsers");

  if (res.status == 200) {
    return res.data;
  }
});

export const getUserData = createAsyncThunk("getUser", async (id, thunkAPI) => {
  const res = await backend.get(`/getUser/${id}`);
  if (res.status == 200) {
    return res.data;
  }
});
export const getGroupData = createAsyncThunk("getGroupData", async (id, thunkAPI) => {
  const res = await backend.get(`/getGroup/${id}`);
  if (res.status == 200) {
    return res.data;
  }
});

const chatscreen = createSlice({
  name: "chatscreen",
  initialState,
  reducers: {
    createGroup : (state, {payload})=>{
      state.single.type = 'CREATE_GROUP'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.array = payload.data;
      
    });
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      console.log(payload.data,"user data")
      state.single.type = "CHAT";
      state.single.data = payload.data;
   
       
     
    });
    builder.addCase(getGroupData.fulfilled, (state, { payload }) => {
      console.log(payload.data,"group data")
      state.single.type = "GROUP";
      state.single.data = payload.data;
      
  
    });
  },
});

export const {createGroup} = chatscreen.actions;
export default chatscreen.reducer;
