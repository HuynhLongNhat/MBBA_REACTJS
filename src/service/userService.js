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
export {
    registerNewUser,
    LoginUser,
    CreateNewTypeProduct,
    GetAllTypeProduct,
    DeleteTypeProduct,
    UpdateTypeProduct
}
