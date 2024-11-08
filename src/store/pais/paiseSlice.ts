import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
  selectedCountry: string;
}

const initialState: CountryState = {
  selectedCountry: "Honduras",
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry(state, action: PayloadAction<string>) {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
