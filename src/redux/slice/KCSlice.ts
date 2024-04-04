import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type UserType = "anonymous" | "user_mbank";

export interface KCSliceStateProps {
  userType: UserType;
}

const userTypeInitialState: KCSliceStateProps = {
  userType: "anonymous",
};

export const userTypeSlice = createSlice({
  name: "counter",
  initialState: userTypeInitialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
