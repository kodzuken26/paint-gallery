import { paintApi } from "./paintApi";
import { configureStore } from "@reduxjs/toolkit";

export * from "./axiosQuery";
export * from "./paintApi";

export const store = configureStore({
  reducer: {
    [paintApi.reducerPath]: paintApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["api/executeMutation/rejected"],
        ignoredPaths: ["api.error"],
      },
    }).concat(paintApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
