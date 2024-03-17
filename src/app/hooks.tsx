import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

// This will allow us to dispatch actions to the Redux store.
export const useAppDispatch = () => useDispatch<AppDispatch>();


// This will allow us to select data from the Redux store.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Both of these custom hooks are used to make working with the store more streamlined and type safe.
 * Now we can use them both in the whole app instead of use dispatch and use selector.
 */