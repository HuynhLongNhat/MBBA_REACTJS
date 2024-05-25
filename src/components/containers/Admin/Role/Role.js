import "./Role.scss"
import { useEffect, useState, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-toastify";
import { createNewRole } from "../../../../redux/slices/RoleSlice";
import TableRole from "./TableRole";
import { useDispatch } from "react-redux";
const Role = () => {

    const dispatch = useDispatch()
    const dataChildDefault = {
        child1: { url: '', description: '', isValidUrl: true }
    }
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault

    })
    const childRef = useRef()

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;

        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds(_listChilds)
    }
    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child${uuidv4()}`] = dataChildDefault
        setListChilds(_listChilds)
    }
    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds)
    }

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result
    }

    const handleSave = () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        })
        if (!invalidObj) {
            let data = buildDataToPersist()
            let res = dispatch(createNewRole(data));
            if (res && res.EC === 0) {
                toast.success(res.EM)
                childRef.current.fetchListRolesAgain()
            }
        } else {

            toast.error('input URL must not be empty....')
            //error
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds)

        }


    }



    return (<div className="role-container">
        <div className="container">
            <div className=" mt-3">
                <div className="title-role"><h4>Thêm vai trò mới...</h4></div>
                <div className=" role-parent">
                    {
                        Object.entries(listChilds).map(([key, child], index) => {
                            return (
                                <div className="row role-child" key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        <label>URL:</label>
                                        <input
                                            onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                            type="text" className={child.isValidUrl === true ? 'form-control' : "form-control is-invalid"} value={child.url} />
                                    </div>
                                    <div className="col-5 form-group">
                                        <label>Mô tả:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={child.description}
                                            onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-2 mt-4 actions" >
                                        <i className="fa fa-plus-circle add" onClick={() => handleAddNewInput()}></i>
                                        {index >= 1 && <i className="fa fa-trash-o delete"
                                            onClick={() => handleDeleteInput(key)}

                                        ></i>}
                                    </div>

                                </div>
                            )
                        })
                    }

                    <div> <button className="btn  btn-warning mt-3" onClick={() => handleSave()}>Save</button></div>
                </div>

            </div>
            <div className="mt-3 table-role">
                <h4>Danh sách các vai trò</h4>
                <TableRole ref={childRef} />
            </div>
        </div>
    </div>);
}

export default Role;