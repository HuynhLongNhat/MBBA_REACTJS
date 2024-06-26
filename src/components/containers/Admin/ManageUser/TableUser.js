import React, { useEffect, useState } from "react";
import "./TableUser.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUser } from "../../../../redux/slices/UserSlice"
import ModalConfirm from "./ModalConfirm";
import _ from "lodash"
import { debounce } from "lodash"
const TableUser = (props) => {


    const { handleEditUserFromParent } = props;
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)

    const [dataUser, setDataUser] = useState({})
    const dispatch = useDispatch();
    const listUser = useSelector((state) => state.user.ListUser)
    const [_listUser, _setListUser] = useState({})
    const isError = useSelector((state) => state.product.isError)
    const isLoading = useSelector((state) => state.product.isLoading)
    const [hasFetched, setHasFetched] = useState(false);

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id')

    useEffect(() => {
        let res = dispatch(FetchAllUser());

    }, [])

    useEffect(() => {
        if (!hasFetched) {
            dispatch(FetchAllUser());
            setHasFetched(true);
        }
        _setListUser(listUser);
        console.log('list user:', _listUser)

    }, [listUser, hasFetched]);

    const handleEditUser = (user) => {
        handleEditUserFromParent(user)
    };

    const toggleShowModalConfirm = () => {
        setShowModalConfirm(!isShowModalConfirm)
    }
    const handleDeleteTypeProduct = (user) => {
        toggleShowModalConfirm()
        setDataUser(user)

    };

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUser = _.cloneDeep(_listUser);
            cloneListUser = cloneListUser.filter(item => item.email.toLowerCase().includes(term.toLowerCase()))
            _setListUser(cloneListUser)
        } else {
            dispatch(FetchAllUser())
        }
    }, 500)

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(_listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        _setListUser(cloneListUser)

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
                <input className='form-control' placeholder='Tìm kiếm theo email...'
                    onChange={(event) => handleSearch(event)}
                ></input>
            </div>
            <table id="TableUser">
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
                                <span>Tên người dùng</span>
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

                        <th>
                            <div className='sort-header'>
                                <span>Email</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down-long"
                                        onClick={() =>
                                            handleSort('desc', 'email')
                                        }
                                    ></i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'email')
                                        }
                                    ></i></span>
                            </div>
                        </th>


                        <th>Giới tính</th>
                        <th>
                            <div className='sort-header'>
                                <span>Số điện thoại</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down-long"
                                        onClick={() =>
                                            handleSort('desc', 'phone')
                                        }
                                    ></i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'phone')
                                        }
                                    ></i></span>
                            </div>
                        </th>
                        <th>Nhóm</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {_listUser &&
                        _listUser.length > 0 &&
                        _listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stt-user">{index + 1}</td>
                                    <td className="id">{item.id}</td>
                                    <td className="name">{item.name}</td>

                                    <td className="email">{item.email}</td>
                                    <td className="gender">{item.gender}</td>
                                    <td className="phone">
                                        {item.phone}
                                    </td >
                                    <td className="group">
                                        {item.groupId}
                                    </td >
                                    <td>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => handleEditUser(item)}
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
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={toggleShowModalConfirm}
                dataUser={dataUser}
            />

        </div>
    );
}



export default TableUser;
