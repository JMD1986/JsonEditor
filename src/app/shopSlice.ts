import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValidJson } from "../models/schema";
import { MockData } from "../models/classes";

interface ShopState {
  value: ValidJson;
}

const initialState: ShopState = {
  value: MockData.Default(),
};

export const shopSlice = createSlice({
  name: "shop",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    shop: {},
  },
  reducers: {
    load: (state, action) => {
      state.shop = action.payload;
    },

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { load } = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
