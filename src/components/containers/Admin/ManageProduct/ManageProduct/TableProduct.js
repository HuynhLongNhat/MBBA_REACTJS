import React, { useEffect, useState } from "react";
import "./TableProduct.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllProduct,
    deleteProduct,
} from "../../../../../redux/slices/ProductSlice";
import ModalConfirmDeleteProduct from "./ModalConfirmDeleteProduct";
import _ from "lodash"
import { debounce } from "lodash"
const TableProduct = (props) => {


    const { handleEditProductFromParent } = props;
    const dispatch = useDispatch();
    const listProduct = useSelector((state) => state.product.listProduct)

    const isError = useSelector((state) => state.product.isError)
    const isLoading = useSelector((state) => state.product.isLoading)
    const [isShowModalConfirm, setShowModalConfirm] = useState(false);
    const [dataProduct, setDataProduct] = useState({})
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id')
    const [_listProduct, _setListProduct] = useState({})

    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (!hasFetched) {
            dispatch(fetchAllProduct());
            setHasFetched(true);
        }
        _setListProduct(listProduct);
        console.log("data :", _listProduct)
    }, [listProduct, hasFetched]);


    const toggleShowModalConfirm = () => {
        setShowModalConfirm(!isShowModalConfirm)
    }
    const handleEditTypeProduct = (typeProduct) => {
        handleEditProductFromParent(typeProduct)
    };
    const handleDeleteProduct = (product) => {
        toggleShowModalConfirm()
        setDataProduct(product)
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


    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListProduct = _.cloneDeep(_listProduct);
            cloneListProduct = cloneListProduct.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
            _setListProduct(cloneListProduct)
        } else {
            dispatch(fetchAllProduct())
        }
    }, 500)

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListProduct = _.cloneDeep(_listProduct);
        cloneListProduct = _.orderBy(cloneListProduct, [sortField], [sortBy])
        _setListProduct(cloneListProduct)

    }



    return (
        <>
            <div className="container">
                <div className='col-12 col-sm-4 my-3'>
                    <input className='form-control' placeholder='Tìm kiếm theo tên'
                        onChange={(event) => handleSearch(event)}
                    ></input>
                </div>
                <table id="TableTypeProduct">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long"
                                            onClick={() =>
                                                handleSort('desc', 'id')
                                            }
                                        ></i>
                                        <i className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort('asc', 'id')
                                            }
                                        ></i></span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Loại</span>

                                </div> </th>
                            <th>    <div className='sort-header'>
                                <span>Tên</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down-long"
                                        onClick={() =>
                                            handleSort('desc', 'name')
                                        }
                                    ></i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'name')
                                        }
                                    ></i></span>
                            </div></th>
                            <th>Mô tả</th>
                            <th>
                                <div className='sort-header'>
                                    <span>Số lượng</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long"
                                            onClick={() =>
                                                handleSort('desc', 'quantity')
                                            }
                                        ></i>
                                        <i className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort('asc', 'quantity')
                                            }
                                        ></i></span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Giá</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long"
                                            onClick={() =>
                                                handleSort('desc', 'cost')
                                            }
                                        ></i>
                                        <i className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort('asc', 'cost')
                                            }
                                        ></i></span>
                                </div> </th>
                            <th>Hình ảnh</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_listProduct &&
                            _listProduct.length > 0 &&
                            _listProduct.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="stt_product">{item.id}</td>
                                        <td className="type">{item.typeProductData.name}</td>
                                        <td className="name-product">{item.name}</td>
                                        <td className="description">{item.description}</td>
                                        <td className="quantity-product">{item.quantity}</td>
                                        <td className="cost">{item.cost}<sup>đ</sup></td>
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
                <ModalConfirmDeleteProduct
                    show={isShowModalConfirm}
                    handleClose={toggleShowModalConfirm}
                    dataProduct={dataProduct}
                />
            </div>

        </>
    );
}
export default TableProduct;