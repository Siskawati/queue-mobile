import {
  useDispatch as useNativeDispatch,
  useSelector as useNativeSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "./ReduxTypes";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useNativeDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useNativeSelector;
