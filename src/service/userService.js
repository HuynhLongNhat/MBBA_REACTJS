import axios from "./axios";

const registerNewUser = (data) => {
    return axios.post("/register", data);
};
const LoginUser = (data) => {
    return axios.post("/login", data);
};

const CreateNewUserUser = (data) => {
    return axios.post("/user/create", data)
}
const DeleteAUser = (userData) => {
    return axios.delete("/user/delete", {
        data: {
            id: userData.id
        }
    })
}

const GetAllUser = () => {
    return axios.get('/user/read')
}

const UpdateUser = (userData) => {
    return axios.put('/user/update', { userData })
}
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

const getAllGroup = () => {
    return axios.get("/group/read")
}

export {
    registerNewUser,
    LoginUser,
    GetAllUser,
    CreateNewTypeProduct,
    GetAllTypeProduct,
    DeleteTypeProduct,
    UpdateTypeProduct,
    getListType,
    CreateNewProduct,
    getAllProduct,
    DeleteProduct,
    updateProduct,
    CreateNewUserUser,
    getAllGroup,
    DeleteAUser,
    UpdateUser

}
