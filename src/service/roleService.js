import axios from "../setup/axios";


const CreateRoles = (roles) => {
    return axios.post('role/create', [...roles])
}


const fetchAllRoles = () => {
    return axios.get("role/read");
};

const deleteARole = (role) => {
    return axios.delete(`role/delete`, {
        data: {
            id: role.id,
        },
    });
}

const updateARole = (role) => {
    return axios.put(`/role/update`, { ...role })
}

const fetchRoleByGroup = (groupId) => {
    return axios.get(`role/by-group/${groupId}`);
}

const assignRoleToGroup = (data) => {
    return axios.post('role/assign-to-group', { ...data })
}

export {
    CreateRoles,
    fetchAllRoles,
    deleteARole,
    fetchRoleByGroup,
    assignRoleToGroup,
    updateARole
}
