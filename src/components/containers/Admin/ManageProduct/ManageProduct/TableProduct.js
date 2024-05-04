import React, { useEffect, useState } from "react";
import "./TableProduct.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllProduct,
    deleteProduct,

} from "../../../../../redux/slices/ProductSlice";

const TableProduct = (props) => {


    const { handleEditProductFromParent } = props;


    const dispatch = useDispatch();
    const listProduct = useSelector((state) => state.product.listProduct)
    const isError = useSelector((state) => state.product.isError)
    const isLoading = useSelector((state) => state.product.isError)


    useEffect(() => {
        let res = dispatch(fetchAllProduct());

        console.log('list product data :', listProduct)

    }, [])

    const handleEditTypeProduct = (typeProduct) => {
        handleEditProductFromParent(typeProduct)
    };
    const handleDeleteProduct = (product) => {

        let resDelete = dispatch(deleteProduct(product));


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
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Hình ảnh</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct &&
                        listProduct.length > 0 &&
                        listProduct.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stt">{index + 1}</td>
                                    <td className="type">{item.typeProductData.name}</td>
                                    <td className="name">{item.name}</td>
                                    <td className="description">{item.description}</td>
                                    <td className="quantity">{item.quantity}</td>
                                    <td className="cost">{item.cost}</td>
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
                                            onClick={() => handleDeleteProduct(item)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

        </div>
    );
}



export default TableProduct;
