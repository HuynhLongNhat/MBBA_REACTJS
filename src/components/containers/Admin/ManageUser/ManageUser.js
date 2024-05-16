import React, { useEffect, useState } from 'react'

import TableUser from './TableUser';
import ModalConfirm from './ModalConfirm';
import ModalHandleUser from './ModalHandleUser';
const ManageUser = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [action, setAction] = useState('CREATE');
    const [dataEditUser, setDataUser] = useState({})



    const toggleShowModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    const handleEditUserFromParent = (user) => {
        setIsOpenModal(!isOpenModal)
        setAction("UPDATE")
        console.log('data :', user)
        setDataUser(user)

    }

    return (
        <div>
            <div className="manage-product-container container">
                <div className=" mt-5 ms-title"><h3>Quản lí người dùng</h3> </div>
                <div className="btn btn-primary my-5 mx-3 "
                    onClick={() => {
                        toggleShowModal();
                        setAction("CREATE")
                    }} > <i className="fa-solid fa-circle-plus mx-2"></i> Thêm người dùng mới
                </div>

                <div className="mb-5">
                    <ModalHandleUser
                        show={isOpenModal}
                        toggleShowModal={toggleShowModal}
                        action={action}
                        dataEditUser={dataEditUser}
                    />
                    <TableUser
                        handleEditUserFromParent={handleEditUserFromParent}
                    />
                </div>
            </div >
        </div>
    )
}

export default ManageUser
