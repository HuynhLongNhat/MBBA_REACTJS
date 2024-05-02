import React, { useEffect, useState } from "react";
import "./TableTypeProduct.scss";
import { GetAllTypeProduct, DeleteTypeProduct } from "../../../../../service/userService"
import { toast } from "react-toastify";

const TableTypeProduct = (props) => {


    const { handleEditTypeProductFromParent } = props;
    const [listTypeProduct, setListTypeProduct] = useState([])

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])


    const fetchAllTypeProduct = async () => {
        let list = await GetAllTypeProduct();
        // console.log('data', list.DT[9])
        if (list && list.EC === 0) {
            let data = list.DT;
            setListTypeProduct(data)
        }
    }
    const handleEditTypeProduct = (typeProduct) => {
        handleEditTypeProductFromParent(typeProduct)
    };
    const handleDeleteTypeProduct = async (typeProduct) => {

        let deleteTypeProduct = await DeleteTypeProduct(typeProduct);

        if (deleteTypeProduct && deleteTypeProduct.EC === 0) {
            toast.success(deleteTypeProduct.EM)
            await fetchAllTypeProduct()
        }
        else {
            toast.error(deleteTypeProduct.EM)
        }

    };


    return (
        <div className="container">
            <div
                className="content-left"
                style={{
                    backgroundImage: `url(${listTypeProduct && listTypeProduct.image ? listTypeProduct.image : ""
                        })`,
                }}
            ></div>
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
                                    <td className="description">{item.description}</td>
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

        </div>
    );
}



export default TableTypeProduct;
