import "./GroupRole.scss";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    FetchAllRoles,
    FetchRoleByGroup,
    AssignRoleToGroup,
} from "../../../../redux/slices/RoleSlice";
import { FetchAllGroup } from "../../../../redux/slices/UserSlice";
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
const GroupRole = () => {
    const dispatch = useDispatch()
    const ListGroup = useSelector((state) => state.user.ListGroup)
    const [selectGroup, setSelectGroup] = useState('')
    const [listRoles, setListRoles] = useState([])
    const [assignRoleByGroup, setAssignRoleByGroup] = useState('')
    useEffect(() => {
        dispatch(FetchAllGroup());
        getAllRole()
    }, [])


    const getAllRole = async () => {
        let data = await dispatch(FetchAllRoles());;
        console.log('data :', data)
        if (data && data.payload) {
            setListRoles(data.payload)

        }

    }
    const handleOnchangeGroup = async (value) => {
        dispatch(FetchAllRoles());
        setSelectGroup(value);
        if (value) {
            try {
                let data = await dispatch(FetchRoleByGroup(value));

                let result = buildDataRoleByGroup(data.payload, listRoles);
                setAssignRoleByGroup(result);
            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }
    };

    const buildDataRoleByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let Object = {};
                Object.url = role.url;
                Object.id = role.id;
                Object.description = role.description;
                Object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    Object.isAssigned = groupRoles.some(item => item.url === Object.url);
                }
                result.push(Object)

            })
        }
        return result
    }

    const handleSelectRole = (value) => {
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        let foundIndex = _assignRoleByGroup.findIndex(item => +item.id === +value);
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned;
        }
        setAssignRoleByGroup(_assignRoleByGroup)
    }

    const buildDataToSave = () => {
        let result = {};
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        result.groupId = selectGroup;
        let groupRoles = _assignRoleByGroup.filter(item => item.isAssigned === true);
        let finalGroupRoles = groupRoles.map(item => {
            let data = { groupId: +selectGroup, roleId: item.id };
            return data;
        })
        result.groupRoles = finalGroupRoles;

        return result
    }
    const handleSave = () => {
        let data = buildDataToSave();
        console.log('check data send', data)
        let res = dispatch(AssignRoleToGroup(data));
        if (res) {
            toast.success(res.EM)
        }
    }
    return (<div className="group-role-container">
        <div className="container">
            <div className="container mt-3">
                <h4>Group Role :</h4>

                <div className="assign-group-role">

                    <div className="col-12 col-sm-6 form-group">
                        <label>
                            Select Group :   <span className="text-danger">(*)</span>
                        </label>
                        <select
                            className={
                                "form-select"
                            }
                            onChange={(event) => handleOnchangeGroup(event.target.value)}
                        >
                            <option value=''>
                                Vui lòng chọn group!
                            </option>
                            {ListGroup &&
                                ListGroup.length > 0 &&
                                ListGroup.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <hr>
                </hr>
                {selectGroup &&
                    <div className="roles">
                        <h5>Assign Roles :</h5>
                        {assignRoleByGroup && assignRoleByGroup.length > 0 &&
                            assignRoleByGroup.map((item, index) => {
                                return (
                                    <div className="form-check" key={`list-role-${index}`}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox" value={item.id}
                                            checked={item.isAssigned}
                                            onChange={(event) => handleSelectRole(event.target.value)}
                                            id={`list-role-${index}`} />
                                        <label className="form-check-label" htmlFor={`list-role-${index}`} >{item.url}</label>
                                    </div>
                                )
                            })

                        }
                        <div className="mt-3">
                            <button className="btn btn-warning" onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>);
}

export default GroupRole;