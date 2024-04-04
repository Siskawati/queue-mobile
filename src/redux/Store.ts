import { configureStore } from "@reduxjs/toolkit";

import {
  AuthSliceReducer,
  ErrorInterceptorSlice,
  QueueSliceReducer,
  UserTypeSliceReducer,
} from "./slice";

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    userType: UserTypeSliceReducer,
    errorInterceptor: ErrorInterceptorSlice,
    queue: QueueSliceReducer,
  },
});
