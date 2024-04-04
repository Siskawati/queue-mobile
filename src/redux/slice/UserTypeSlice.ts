import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type UserType = "ANONYMOUS" | "USER_MBANK";

export interface UserTypeStateProps {
  userType: UserType;
}

const userTypeInitialState: UserTypeStateProps = {
  userType: "ANONYMOUS",
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
