import React, { useEffect, useState } from "react";
import "./TableTypeProduct.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllTypeProducts,
    deleteTypeProduct,

} from "../../../../../redux/slices/ProductSlice";
import ModalConfirmDeleteTypeProduct from "./ModalConfirmDeleteTypeProduct";
import _ from "lodash"
import { debounce } from "lodash"
const TableTypeProduct = (props) => {


    const { handleEditTypeProductFromParent } = props;
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)

    const [dataTypeProduct, setDataTypeProduct] = useState({})
    const dispatch = useDispatch();
    const listTypeProduct = useSelector((state) => state.product.listTypeProduct.DT)
    const [_listTypeProduct, _setListTypeProduct] = useState({})
    const isError = useSelector((state) => state.product.isError)
    const isLoading = useSelector((state) => state.product.isLoading)
    const [hasFetched, setHasFetched] = useState(false);

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id')

    useEffect(() => {
        let res = dispatch(fetchAllTypeProducts());
    }, [])

    useEffect(() => {
        if (!hasFetched) {
            dispatch(fetchAllTypeProducts());
            setHasFetched(true);
        }
        _setListTypeProduct(listTypeProduct);

    }, [listTypeProduct, hasFetched]);

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

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListProduct = _.cloneDeep(_listTypeProduct);
            cloneListProduct = cloneListProduct.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
            _setListTypeProduct(cloneListProduct)
        } else {
            dispatch(fetchAllTypeProducts())
        }
    }, 500)

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListProduct = _.cloneDeep(_listTypeProduct);
        cloneListProduct = _.orderBy(cloneListProduct, [sortField], [sortBy])
        _setListTypeProduct(cloneListProduct)

    }

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
            <div className='col-12 col-sm-4 my-3'>
                <input className='form-control' placeholder='Tìm kiếm theo loại...'
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
                            </div>
                        </th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {_listTypeProduct &&
                        _listTypeProduct.length > 0 &&
                        _listTypeProduct.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="">{index + 1}</td>
                                    <td className="stt">{item.id}</td>
                                    <td className="name">{item.name}</td>
                                    <td className="description-type-product">{item.description}</td>
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
