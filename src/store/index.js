import { configureStore } from "@reduxjs/toolkit";
import checkReducer from "./checkSlice.js";
export default configureStore({
    reducer: {
        checks: checkReducer,
    },
     middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}) 