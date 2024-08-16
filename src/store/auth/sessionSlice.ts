import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any[] = [];
const sessionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      return action.payload;
    },
    clearUser(state) {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = sessionSlice.actions;
export default sessionSlice.reducer;
