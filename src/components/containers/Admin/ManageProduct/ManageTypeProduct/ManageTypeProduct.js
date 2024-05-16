import { useState } from "react";


import TableTypeProduct from "./TableTypeProduct";

import ModalHandleTypeProduct from "./ModalHandleTypeProduct";
const ManageTypeProduct = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [action, setAction] = useState('CREATE');
    const [dataEditTypeProduct, setDataEditTypeProduct] = useState({})



    const toggleShowModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    const handleEditTypeProductFromParent = (TypeProduct) => {
        setIsOpenModal(!isOpenModal)
        setAction("UPDATE")
        setDataEditTypeProduct(TypeProduct)
    }
    return (<>
        <div className="manage-product-container container">
            <div className=" mt-5 ms-title"><h3>Quản lí loại cây</h3> </div>
            <div className="btn btn-primary my-5 mx-3 "
                onClick={() => {
                    toggleShowModal();
                    setAction("CREATE")
                }} > <i className="fa-solid fa-circle-plus mx-2"></i> Thêm loại cây mới
            </div>

            <div className="mb-5">
                <ModalHandleTypeProduct
                    show={isOpenModal}
                    toggleShowModal={toggleShowModal}
                    action={action}
                    dataEditTypeProduct={dataEditTypeProduct}
                />
                <TableTypeProduct
                    handleEditTypeProductFromParent={handleEditTypeProductFromParent}
                />
            </div>
        </div >
    </>);
}

export default ManageTypeProduct;