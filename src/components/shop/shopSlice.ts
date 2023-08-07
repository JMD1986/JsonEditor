import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValidJson } from "../../models/schema";

interface ShopState {
  value: ValidJson;
}

// const initialState: ShopState = {
// value: null
// }
