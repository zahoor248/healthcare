import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux-setup/apiSlice";
import TestSlice from "../redux-setup/TestSlice";
const store = configureStore({
  reducer: {
    dataSlice: TestSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
export default store;
