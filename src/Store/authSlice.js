import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  },

  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      state.token = action.payload;
      localStorage.setItem("token", action.payload.token);
    },

    updateUserInfo: (state, action) => {
      state.user.name = action.payload;
    },

    destroyUserInfo: (state) => {
      state.user = {};
      localStorage.removeItem("user");

      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setUserInfo, updateUserInfo, destroyUserInfo } =
  authSlice.actions;

export default authSlice.reducer;
