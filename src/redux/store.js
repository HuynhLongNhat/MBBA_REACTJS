import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./slices/ProductSlice";
import UserReducer from "./slices/UserSlice";
export const store = configureStore({
    reducer: {
        product: ProductReducer,
        user: UserReducer
    }
})

