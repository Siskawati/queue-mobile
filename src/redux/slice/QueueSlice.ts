import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface QueueStateProps {
  queueDate: string;
  branchName: string;
  currentQueue: number;
  lastQueue: number;
  needs: string;
  userId: number;
  branchId: number;
  queueNumber: number;
}

const queueInitialState: Partial<QueueStateProps> = {};

export const queueSlice = createSlice({
  name: "counter",
  initialState: queueInitialState,
  reducers: {
    removeQueueData: () => {
      return {};
    },

    setQueueData: (state, action: PayloadAction<QueueStateProps>) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeQueueData, setQueueData } = queueSlice.actions;

export default queueSlice.reducer;
