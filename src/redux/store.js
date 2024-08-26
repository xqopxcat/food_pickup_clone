import { configureStore } from '@reduxjs/toolkit';
import { branchesCoreApi } from "./services/branchesCoreApi";

export const store = configureStore({
    reducer: {
        [branchesCoreApi.reducerPath]: branchesCoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat([branchesCoreApi.middleware]),
});