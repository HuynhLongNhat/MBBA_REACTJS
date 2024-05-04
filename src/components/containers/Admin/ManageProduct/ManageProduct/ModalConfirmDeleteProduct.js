
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ToastContainer, toast } from 'react-toastify';
import {

    deleteProduct,

} from "../../../../../redux/slices/ProductSlice";
import { useDispatch } from 'react-redux';
const ModalConfirmDeleteProduct = (props) => {
    const dispatch = useDispatch()
    const { show, handleClose, dataProduct } = props
    const confirmDelete = async () => {
        let resDelete = dispatch(deleteProduct(dataProduct));
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
                    <Modal.Title>Xóa  cây "{dataProduct.name}"!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Không thể hoàn tác hành động này!Bạn có muốn xóa cây này không!

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

export default ModalConfirmDeleteProduct;