
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UpdateRole } from "../../../../redux/slices/RoleSlice"
import { useDispatch } from "react-redux";
const ModalEditRole = (props) => {
    const { show, handleClose, dataRole } = props
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("")

    useEffect(() => {
        setUrl(dataRole.url);
        setDescription(dataRole.description)
    }, [dataRole])
    const dispatch = useDispatch()

    const handleUpdateRole = () => {
        let res = dispatch(UpdateRole({
            id: dataRole.id,
            url: url,
            description: description
        }))

        if (res) {
            handleClose();
            setUrl('');
            setDescription('')
        }
    }
    return (
        <div>
            <Modal size="lg" show={show} className="modal-user">
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>
                        Chỉnh sửa thông tin
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">

                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                URL <span className="text-danger">(*)</span>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Mô tả <span className="text-danger">(*)</span>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />

                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateRole()}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );


}

export default ModalEditRole
