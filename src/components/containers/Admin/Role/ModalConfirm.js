import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {

    deleteRole
} from "../../../../redux/slices/RoleSlice"
import { useDispatch } from "react-redux";
function ModalConfirm(props) {

    const { show, handleClose, dataRole } = props

    const dispatch = useDispatch()

    const confirmDelete = async () => {
        let resDelete = dispatch(deleteRole(dataRole));
        if (resDelete) {
            handleClose()
        }
    }
    return (
        <>
            <Modal show={show} onClick={handleClose} centered>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title> Xác nhận xóa role !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có thực sự muốn xóa role này không ?
                    <br></br>
                    <b>Role</b> : <b>{dataRole.url}</b>
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
