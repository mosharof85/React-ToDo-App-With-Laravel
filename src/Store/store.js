import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});
