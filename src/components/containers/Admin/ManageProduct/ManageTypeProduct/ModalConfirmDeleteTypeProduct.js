
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ToastContainer, toast } from 'react-toastify';
import {

    deleteTypeProduct,

} from "../../../../../redux/slices/ProductSlice";
import { useDispatch } from 'react-redux';
const ModalConfirmDeleteTypeProduct = (props) => {
    const dispatch = useDispatch()
    const { show, handleClose, dataTypeProduct } = props
    const confirmDelete = async () => {
        let resDelete = dispatch(deleteTypeProduct(dataTypeProduct));
        if (resDelete) {
            handleClose()
        }
    }
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa loại cây "{dataTypeProduct.name}"!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Không thể hoàn tác hành động này!Bạn có muốn xóa loại cây này không!

                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default ModalConfirmDeleteTypeProduct;