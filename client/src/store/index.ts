import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './slices/eventsSlice'
import { createSocketMiddleware } from './socketMiddleware'

const socketMiddleware = createSocketMiddleware('http://localhost:3000')

export const store = configureStore({
    reducer: {
        events: eventsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
