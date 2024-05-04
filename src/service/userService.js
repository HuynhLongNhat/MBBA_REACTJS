import axios from "./axios";

const registerNewUser = (data) => {
    return axios.post("/register", data);
};
const LoginUser = (data) => {
    return axios.post("/login", data);
};

const CreateNewTypeProduct = (TypeProduct) => {
    return axios.post('/manage-products/create-type-product', TypeProduct)
}

const GetAllTypeProduct = () => {
    return axios.get('/manage-products/getAll-type-product')
}

const DeleteTypeProduct = (TypeProduct) => {
    return axios.delete('/manage-products/delete-type-product',
        {
            data:
            {
                id: TypeProduct.id
            }
        })
}
const UpdateTypeProduct = (TypeProduct) => {
    return axios.put('/manage-products/update-type-product', { ...TypeProduct })
}


const getListType = () => {
    return axios.get("/manage-products/getListType")
}

const CreateNewProduct = (product) => {
    return axios.post('/manage-products/create-product', product)
}

const getAllProduct = () => {
    return axios.get('/manage-products/getAll-product')
}

const DeleteProduct = (product) => {
    return axios.delete('/manage-products/delete-product',
        {
            data:
            {
                id: product.id
            }
        })
}

const updateProduct = (product) => {
    return axios.put("/manage-products/update-product", { ...product })
}

export {
    registerNewUser,
    LoginUser,
    CreateNewTypeProduct,
    GetAllTypeProduct,
    DeleteTypeProduct,
    UpdateTypeProduct,
    getListType,
    CreateNewProduct,
    getAllProduct,
    DeleteProduct,
    updateProduct
}
