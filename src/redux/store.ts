import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { bookApi } from "./services/book";
import { borrowApi } from "./services/borrow";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
