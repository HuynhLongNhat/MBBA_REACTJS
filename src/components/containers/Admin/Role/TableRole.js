import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
    FetchAllRoles,
    deleteRole
} from "../../../../redux/slices/RoleSlice"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "./ModalConfirm";
import ModalEditRole from "./ModalEditRole";
const TableRole = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const listRoles = useSelector((state) => state.role.listRoles)
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)
    const [isShowModalEdit, setShowModalEdit] = useState(false)
    const [dataRole, setDataRole] = useState({})
    useEffect(() => {
        getAllRole()
    }, [])

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            getAllRole()
        }
    }))
    const toggleShowModalConfirm = () => {
        setShowModalConfirm(!isShowModalConfirm)
    }


    const toggleShowModalEdit = () => {
        setShowModalEdit(!isShowModalEdit)
    }

    const handleEditRole = (role) => {
        toggleShowModalEdit()
        console.log('role edit', role)
        setDataRole(role)
    }
    const handleDeleteRole = (role) => {

        toggleShowModalConfirm()
        setDataRole(role)

    };


    const getAllRole = () => {
        let data = dispatch(FetchAllRoles());

    }

    return (<>

        <table className="table table-bordered table-hover">
            <thead>
                <tr>

                    <th scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">Group</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 ? (
                    <>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>

                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => handleEditRole(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>


                                        <button
                                            className=" btn btn-danger"
                                            onClick={() => handleDeleteRole(item)}

                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <tr>
                            <td colSpan={4}>Not found Role!</td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
        <ModalEditRole
            show={isShowModalEdit}
            handleClose={toggleShowModalEdit}
            dataRole={dataRole}
        >

        </ModalEditRole>
        <ModalConfirm
            show={isShowModalConfirm}
            handleClose={toggleShowModalConfirm}
            dataRole={dataRole}
        />
    </>);
})

export default TableRole;