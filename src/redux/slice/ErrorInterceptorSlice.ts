import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ErrorInterceptorStateProps {
  code: number;
  text: string;
}

export const ERROR_INTERCEPTOR_INITIAL_STATE: ErrorInterceptorStateProps = {
  code: 0,
  text: "",
};

export const errorInterceptorSlice = createSlice({
  name: "counter",
  initialState: ERROR_INTERCEPTOR_INITIAL_STATE,
  reducers: {
    setErrorInterceptor: (
      state,
      action: PayloadAction<ErrorInterceptorStateProps>
    ) => {
      state.code = action.payload.code;
      state.text = action.payload.text;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setErrorInterceptor } = errorInterceptorSlice.actions;

export default errorInterceptorSlice.reducer;
