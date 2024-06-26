/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { CreateNewTypeProduct, UpdateTypeProduct } from "../../../../../service/userService";
import CommonUtils from "./../../../../../utils/CommonUtils"
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import "./ModalHandleTypeProduct.scss"
import { useDispatch } from "react-redux";
import { createTypeProduct, editTypeProduct } from "../../../../../redux/slices/ProductSlice"

const ModalHandleTypeProduct = (props) => {

    const { show, toggleShowModal, action, dataEditTypeProduct } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageBase64, setImageBase64] = useState('')
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const defaultValidInput = {
        name: true,
        description: true,
        image: true
    }
    const [checkValid, setCheckValid] = useState(defaultValidInput)

    useEffect(() => {
        if (action === "UPDATE") {
            setName(dataEditTypeProduct.name)
            setDescription(dataEditTypeProduct.description);
            setImageBase64(dataEditTypeProduct.image)
            setImage(dataEditTypeProduct.image)


        }
    }, [dataEditTypeProduct])
    useEffect(() => {
        if (action === "CREATE") {
            setName("")
            setDescription("");
            setImage("")
        }
    }, [action])


    const checkInvalidInput = () => {
        setCheckValid(defaultValidInput)
        if (!name) {
            toast.error('Vui lòng nhập loại sản phẩm!');
            setCheckValid({ ...defaultValidInput, name: false })
            return false;
        }
        if (!description) {
            toast.error('Vui lòng nhập mô tả sản phẩm!');
            setCheckValid({ ...defaultValidInput, description: false });
            return false;
        }
        if (!image) {
            toast.error('Vui lòng tải ảnh sản phẩm!');
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
                    dispatch(createTypeProduct({
                        name: name,
                        description: description,
                        image: imageBase64
                    })))

                : (
                    dispatch(editTypeProduct(
                        {
                            id: dataEditTypeProduct.id,
                            name: name,
                            description: description,
                            image: imageBase64
                        }
                    )))

            if (typeProduct) {
                toggleShowModal()
                setName('');
                setDescription('');
                setImage('')
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
                            <input
                                className={checkValid.name ? "form-control" : "form-control is-invalid"}
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Mô tả <span className="text-danger">(*)</span>
                            </label>
                            <textarea className={checkValid.description ? "form-control" : "form-control is-invalid"}
                                onChange={(event) => setDescription(event.target.value)}
                                value={description}>

                            </textarea>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
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

export default ModalHandleTypeProduct;
