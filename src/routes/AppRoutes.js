import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ManageProduct from "../components/containers/Admin/ManageProduct/ManageProduct/ManageProduct";
import ManageTypeProduct from "../components/containers/Admin/ManageProduct/ManageTypeProduct/ManageTypeProduct";
import { Routes, Route } from "react-router-dom"
import NotFound from "./NotFound";
import PrivateRoutes from "./PrivateRoutes";
import ManageUser from "../components/containers/Admin/ManageUser/ManageUser";
const AppRoutes = () => {
    return (<>
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/product" element={
                <PrivateRoutes>
                    <>Product</>
                </PrivateRoutes>
            }>
            </Route>
            <Route path="/manage-products/product" element={
                <PrivateRoutes>
                    <ManageProduct />
                </PrivateRoutes>
            }>
            </Route>
            <Route path="/manage-products/type-product" element={
                <PrivateRoutes>
                    <ManageTypeProduct />
                </PrivateRoutes>
            }>
            </Route>
            <Route path="/manage-user" element={
                <PrivateRoutes>
                    <ManageUser />
                </PrivateRoutes>
            }></Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    </>);
}

export default AppRoutes;