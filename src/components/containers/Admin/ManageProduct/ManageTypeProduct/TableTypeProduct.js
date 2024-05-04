import React, { useEffect, useState } from "react";
import "./TableTypeProduct.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllTypeProducts,
    deleteTypeProduct,

} from "../../../../../redux/slices/ProductSlice";
import ModalConfirmDeleteTypeProduct from "./ModalConfirmDeleteTypeProduct";
const TableTypeProduct = (props) => {


    const { handleEditTypeProductFromParent } = props;
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)

    const [dataTypeProduct, setDataTypeProduct] = useState({})
    const dispatch = useDispatch();
    const listTypeProduct = useSelector((state) => state.product.listTypeProduct.DT)
    const isError = useSelector((state) => state.product.isError)
    const isLoading = useSelector((state) => state.product.isLoading)


    useEffect(() => {
        let res = dispatch(fetchAllTypeProducts());



    }, [])

    const handleEditTypeProduct = (typeProduct) => {
        handleEditTypeProductFromParent(typeProduct)
    };

    const toggleShowModalConfirm = () => {
        setShowModalConfirm(!isShowModalConfirm)
    }
    const handleDeleteTypeProduct = (typeProduct) => {
        toggleShowModalConfirm()
        setDataTypeProduct(typeProduct)



    };

    if (isError === true && isLoading === false) {
        return (<>
            <div> Đã có lỗi ! Vui lòng thử lại !</div>
        </>)
    }
    if (isError === false && isLoading === true) {
        return (
            <div> Data loading...</div>
        )
    }

    return (
        <div className="container">

            <table id="TableTypeProduct">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Loại </th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listTypeProduct &&
                        listTypeProduct.length > 0 &&
                        listTypeProduct.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stt">{index + 1}</td>
                                    <td className="name">{item.name}</td>
                                    <td className="description-type-product ">{item.description}</td>
                                    <td className="image-type-product">
                                        <div className="image" style={{
                                            backgroundImage: `url(${item.image})`,
                                        }} >

                                        </div>
                                    </td >
                                    <td>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => handleEditTypeProduct(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className=" btn btn-danger"
                                            onClick={() => handleDeleteTypeProduct(item)}

                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ModalConfirmDeleteTypeProduct
                show={isShowModalConfirm}
                handleClose={toggleShowModalConfirm}
                dataTypeProduct={dataTypeProduct}
            />

        </div>
    );
}



export default TableTypeProduct;
