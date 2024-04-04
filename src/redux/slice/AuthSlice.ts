import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateProps {
  token: string | undefined;
}

const authInitialState: AuthStateProps = {
  token: undefined,
};

export const authSlice = createSlice({
  name: "counter",
  initialState: authInitialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    removeToken: () => {
      return authInitialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeToken, setToken } = authSlice.actions;

export default authSlice.reducer;
