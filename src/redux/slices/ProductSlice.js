import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    GetAllTypeProduct,
    DeleteTypeProduct,
    UpdateTypeProduct,
    CreateNewTypeProduct,
    getListType,
    CreateNewProduct,
    getAllProduct,
    DeleteProduct,
    updateProduct
} from "../../service/userService"
import { toast } from "react-toastify";

export const fetchAllTypeProducts = createAsyncThunk(
    "type-products/fetchAllTypeProducts",
    async () => {
        const res = await GetAllTypeProduct()
        return res;
    }
)

export const deleteTypeProduct = createAsyncThunk(
    "type-product/deleteTypeProduct",
    async (typeProduct, { dispatch }) => {
        const res = await DeleteTypeProduct(typeProduct);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(fetchAllTypeProducts())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

export const createTypeProduct = createAsyncThunk(
    "type-product/createTypeProduct",
    async (typeProduct, { dispatch }) => {
        const res = await CreateNewTypeProduct(typeProduct);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(fetchAllTypeProducts())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const editTypeProduct = createAsyncThunk(
    "type-product/editTypeProduct",
    async (typeProduct, { dispatch }) => {
        const res = await UpdateTypeProduct(typeProduct);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(fetchAllTypeProducts())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const getListTypeProduct = createAsyncThunk(
    "product/getListTypeProduct",
    async () => {
        const res = await getListType();
        return res.DT
    }
)

export const fetchAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        let res = await getAllProduct();
        return res.DT
    }
)

export const createNewProduct = createAsyncThunk(
    "product/createNewProduct",
    async (product, { dispatch }) => {
        let res = await CreateNewProduct(product)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(fetchAllProduct())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (product, { dispatch }) => {
        const res = await DeleteProduct(product);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(fetchAllProduct())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

export const update_Product = createAsyncThunk(
    "product/updateProduct",
    async (product, { dispatch }) => {
        const res = await updateProduct(product);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(fetchAllProduct())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

const initialState = {
    listTypeProduct: [],
    isLoading: false,
    isError: false,
    listType: [],
    listProduct: [],

}

export const ProductSlide = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //fetchAllTypeProducts
            .addCase(fetchAllTypeProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllTypeProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listTypeProduct = action.payload
            })
            .addCase(fetchAllTypeProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
            })
            //getListTypeProduct
            .addCase(getListTypeProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getListTypeProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listType = action.payload;

            })
            .addCase(getListTypeProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
            })

            // get all product
            .addCase(fetchAllProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listProduct = action.payload;

            })
            .addCase(fetchAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
            })
    }
})

export default ProductSlide.reducer