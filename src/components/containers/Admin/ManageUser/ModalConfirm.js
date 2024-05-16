import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../../redux/slices/UserSlice"
import { useDispatch } from "react-redux";
function ModalConfirm(props) {

    const { show, handleClose, dataUser } = props

    const dispatch = useDispatch()

    const confirmDelete = async () => {
        let resDelete = dispatch(deleteUser(dataUser));
        if (resDelete) {
            handleClose()
        }
    }
    return (
        <>
            <Modal show={show} onClick={handleClose} centered>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title> Xác nhận xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có thực sự muốn xóa người dùng này không ?
                    <br></br>
                    <b>Email</b> : <b>{dataUser.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
