import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    open: false,
  },
  chat: {
    open: false,
  },
  bid: {
    open: false,
  },
  setting: {
    open: false,
  },
  card: {
    open: false,
  },
  bank: {
    open: false,
  }
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNotification(state, action) {
      state.notification.open = action.payload.open;
    },
    toggleChat(state, action) {
      state.chat.open = action.payload.open;
    },
    toggleBid(state, action) {
      state.bid.open = action.payload.open;
    },
    toggleSetting(state, action) {
      state.setting.open = action.payload.open;
    },
    toggleCard(state, action) {
      state.card.open = action.payload.open;
    },
    toggleBank(state, action) {
      state.bank.open = action.payload.open;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
