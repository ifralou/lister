import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/taskSlice"

export default configureStore({
    reducer: {
        counter: counterReducer
    },
})