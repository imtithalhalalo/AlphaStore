import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "../features/itemsAPi";
import storeReducer from "../features/storeSlice";

export const store = configureStore({
    reducer: {
        [itemsApi.reducerPath]: itemsApi.reducer,
        store: storeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware)
});


/**
 * Now both of these types are to ensure type safety when dispatching actions and accessing the state from the store.
 * While it's possible to import the route state and the app dispatch types into each component, but it's
 * better to create type versions of the use dispatch and use selector hooks for usage in the application.
 */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;