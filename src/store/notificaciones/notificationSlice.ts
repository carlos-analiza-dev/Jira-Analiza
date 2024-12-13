import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  notificationCount: number;
}

const initialState: NotificationState = {
  notificationCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload;
    },
    clearNotifications: () => initialState,
  },
});

export const { setNotificationCount, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
