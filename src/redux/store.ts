import { configureStore } from '@reduxjs/toolkit'
import storeSlice from './slice/storeSlice'

export const store = configureStore({
  reducer: {
    store: storeSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch