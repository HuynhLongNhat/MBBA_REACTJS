import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./slices/ProductSlice";
import UserReducer from "./slices/UserSlice";
import RoleReducer from "./slices/RoleSlice"
export const store = configureStore({
    reducer: {
        product: ProductReducer,
        user: UserReducer,
        role: RoleReducer
    }
})

