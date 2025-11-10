import { createSlice } from "@reduxjs/toolkit";
import { ZCOOL_KuaiLe } from "next/font/google";

const initialState = {
  message: "Hello World",
};

const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});

export default helloSlice.reducer;