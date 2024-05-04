import { useState } from "react";

import "./ManageProduct.scss"
import TableProduct from "./TableProduct";

import ModalHandleProduct from "./ModalHandleProduct";
const ManageProduct = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [action, setAction] = useState('CREATE');
    const [dataEditProduct, setDataEditProduct] = useState({})



    const toggleShowModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    const handleEditProductFromParent = (Product) => {
        setIsOpenModal(!isOpenModal)
        setAction("UPDATE")
        console.log("data :", Product)
        setDataEditProduct(Product)
    }
    return (<>
        <div className="manage-product-container container">
            <div className=" mt-5 ms-title"><h3>Quản lí cây theo loại </h3> </div>
            <div className="btn btn-primary my-5 mx-3 "
                onClick={() => {
                    toggleShowModal();
                    setAction("CREATE")
                }} > <i className="fa-solid fa-circle-plus mx-2"></i> Thêm cây mới
            </div>

            <div className="mb-5">
                <ModalHandleProduct
                    show={isOpenModal}
                    toggleShowModal={toggleShowModal}
                    action={action}
                    dataEditProduct={dataEditProduct}
                />
                <TableProduct
                    handleEditProductFromParent={handleEditProductFromParent}
                />
            </div>
        </div >
    </>);
}

export default ManageProduct;