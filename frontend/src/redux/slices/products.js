import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addDataByApi = createAsyncThunk(
  "addDataByApi",
  async (thunkAPI) => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  }
);
export const addDataByApiByName = createAsyncThunk(
  "addDataByApia",
  async (thunkAPI) => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    loadDataIntoSlice: async (state) => {
      const { data } = await axios.get("https://fakestoreapi.com/products");

      return (state = data);
      //   payload.forEach((e) =>
      //     state.push({ name: e.title, price: e.price, image: e.image })
      //   );
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(addDataByApi.fulfilled, (state, { payload }) => {
  //       return state = payload
  //   });
  // },
  extraReducers : {
    [addDataByApi.fulfilled] : (state, {payload}) =>{
      return state 
    },
    [addDataByApiByName.fulfilled] : (state, {payload}) =>{
      return state = payload
    },
  }
});

export const { loadDataIntoSlice } = productsSlice.actions;

export default productsSlice.reducer;
