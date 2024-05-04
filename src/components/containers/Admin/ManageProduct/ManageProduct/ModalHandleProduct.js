/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import CommonUtils from "./../../../../../utils/CommonUtils"
import Modal from "react-bootstrap/Modal";
// import {   } from "../../service/UserService";
import { toast } from "react-toastify";
import _ from "lodash";
import "./ModalHandleProduct.scss"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux";
import { getListTypeProduct, createNewProduct, update_Product } from "../../../../../redux/slices/ProductSlice"
const ModalHandleProduct = (props) => {

    const { show, toggleShowModal, action, dataEditProduct } = props;


    const listType = useSelector((state) => state.product.listType)
    const [selectedType, setSelectedType] = useState('')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [cost, setCost] = useState(0)
    const [imageBase64, setImageBase64] = useState('')
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const defaultValidInput = {
        selectedType: true,
        name: true,
        description: true,
        quantity: true,
        cost: true,
        image: true
    }
    const [checkValid, setCheckValid] = useState(defaultValidInput)

    useEffect(() => {
        dispatch(getListTypeProduct())

    }, [])

    useEffect(() => {
        if (action === "UPDATE") {
            setSelectedType(dataEditProduct.type_id)
            setName(dataEditProduct.name)
            setDescription(dataEditProduct.description);
            setQuantity(dataEditProduct.quantity);
            setCost(dataEditProduct.cost)
            setImageBase64(dataEditProduct.image)
            setImage(dataEditProduct.image)


        }
    }, [dataEditProduct])
    useEffect(() => {
        if (action === "CREATE") {
            setSelectedType('')
            setName("")
            setDescription("");
            setQuantity('');
            setCost('')
            setImage("")
        }
    }, [action])

    const checkInvalidInput = () => {
        setCheckValid(defaultValidInput)
        if (!selectedType) {
            toast.error('Vui lòng chọn loại cây!');
            setCheckValid({ ...defaultValidInput, selectedType: false })
            return false;
        }
        if (!name) {
            toast.error('Vui lòng nhập tên cây!');
            setCheckValid({ ...defaultValidInput, name: false })
            return false;
        }
        if (!description) {
            toast.error('Vui lòng nhập mô tả cây!');
            setCheckValid({ ...defaultValidInput, description: false });
            return false;
        }
        if (!quantity) {
            toast.error('Vui lòng nhập số lượng cây!');
            setCheckValid({ ...defaultValidInput, quantity: false });
            return false;
        }
        if (!cost) {
            toast.error('Vui lòng nhập giá tiền cây!');
            setCheckValid({ ...defaultValidInput, cost: false });
            return false;
        }
        if (!image) {
            toast.error('Vui lòng tải ảnh cây!');
            setCheckValid({ ...defaultValidInput, image: false })
            return false
        }
        return true;
    }
    const handleSaveNewTypeProduct = async () => {



        let check = checkInvalidInput()
        if (check === true) {


            const typeProduct = action === "CREATE"
                ? (
                    dispatch(createNewProduct({
                        selectedType: selectedType,
                        name: name,
                        description: description,
                        quantity: quantity,
                        cost: cost,
                        image: imageBase64

                    })))

                : (
                    dispatch(update_Product(
                        {
                            id: dataEditProduct.id,
                            selectedType: selectedType,
                            name: name,
                            description: description,
                            quantity: quantity,
                            cost: cost,
                            image: imageBase64

                        }
                    )))

            if (typeProduct) {
                toggleShowModal()
                setName('');
                setDescription('');
                setImage('')
                setQuantity(0);
                setCost(0);
                setImage()
            }

        }
    }
    const handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setImageBase64(base64)
            setImage(objectUrl)

        }
    }

    return (
        <div>
            <Modal size="lg" show={show} className="modal-user">
                <Modal.Header closeButton onHide={toggleShowModal}>
                    <Modal.Title>
                        {action === "CREATE" ? "Thêm loại cây mới" : "Chỉnh sửa thông tin"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Loại cây <span className="text-danger">(*)</span>
                            </label>
                            <select className={checkValid.selectedType ? "form-control" : "form-control is-invalid"}
                                value={selectedType}
                                onChange={(event) => setSelectedType(event.target.value)}

                            >
                                <option value="">Chọn loại cây...</option>
                                {listType &&
                                    listType.length > 0 &&
                                    listType.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Tên cây <span className="text-danger">(*)</span>
                            </label>
                            <input
                                className={checkValid.name ? "form-control" : "form-control is-invalid"}
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-12  form-group mt-3">
                            <label>
                                Mô tả <span className="text-danger">(*)</span>
                            </label>
                            <textarea className={checkValid.description ? "form-control" : "form-control is-invalid"}
                                onChange={(event) => setDescription(event.target.value)}
                                value={description}>

                            </textarea>
                        </div>
                        <div className="col-12 col-sm-6 form-group mt-3">
                            <label>
                                Số lượng <span className="text-danger">(*)</span>
                            </label>
                            <input
                                className={checkValid.quantity ? "form-control" : "form-control is-invalid"}
                                type="number"
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group mt-3">
                            <label>
                                Giá tiền <span className="text-danger">(*)</span>
                            </label>
                            <input
                                className={checkValid.cost ? "form-control" : "form-control is-invalid"}
                                type="text"
                                value={cost}
                                onChange={(event) => setCost(event.target.value)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group mt-3">
                            <label>Ảnh sản phẩm</label>
                            <div className="preview-img-container ">
                                <input
                                    hidden
                                    id="previewImg"
                                    type="file"
                                    // value={image}
                                    onChange={(event) => handleOnchangeImage(event)}
                                />
                                <label className="UpdateTypeProduct btn btn-secondary" htmlFor="previewImg">
                                    Tải ảnh <i className="fa-solid fa-upload"></i>
                                </label>
                                <div
                                    className={checkValid.image ? "preview-image-modal" : "preview-image-modal border-danger "}

                                    style={{
                                        backgroundImage: `url(${image})`,
                                    }}

                                ></div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShowModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveNewTypeProduct()}>
                        {action === "CREATE" ? "Thêm" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ModalHandleProduct;
