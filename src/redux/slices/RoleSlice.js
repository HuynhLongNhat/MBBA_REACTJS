import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    CreateRoles,
    fetchAllRoles,
    deleteARole,
    fetchRoleByGroup,
    assignRoleToGroup,
    updateARole
} from "../../service/roleService";
import { toast } from "react-toastify";

export const createNewRole = createAsyncThunk(
    "user/createNewRole",
    async (RoleData, { dispatch }) => {
        const res = await CreateRoles(RoleData);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(FetchAllRoles())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

export const deleteRole = createAsyncThunk(
    "user/deleteRole",
    async (RoleData, { dispatch }) => {
        const res = await deleteARole(RoleData);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(FetchAllRoles())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)


export const FetchAllRoles = createAsyncThunk(
    "user/fetchAllRoles",
    async () => {
        const res = await fetchAllRoles();
        if (res && res.EC === 0) {
            // toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }

        return res.DT;
    }
)

export const FetchRoleByGroup = createAsyncThunk(
    "user/fetchRoleByGroup",
    async (GroupId) => {
        const res = await fetchRoleByGroup(GroupId);

        if (res && res.EC === 0) {
            // toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
        return res.DT.roles;
    }
)

export const AssignRoleToGroup = createAsyncThunk(
    "user/assignRoleToGroup",
    async (data) => {
        const res = await assignRoleToGroup(data);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

export const UpdateRole = createAsyncThunk(
    "user/updateRole",
    async (data, { dispatch }) => {
        const res = await updateARole(data);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            dispatch(FetchAllRoles())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)


const initialState = {

    isLoading: false,
    isError: false,

}

export const RoleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchAllRoles.pending, (state) => {
                return {
                    ...state,

                    isLoading: true,
                    isError: false

                };
            })
            .addCase(FetchAllRoles.fulfilled, (state, { payload }) => {

                return {
                    ...state,

                    isLoading: false,
                    isError: false,

                };
            })
            .addCase(FetchAllRoles.rejected, (state, { payload }) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true
                };
            })

            .addCase(FetchRoleByGroup.pending, (state) => {
                return {
                    ...state,

                    isLoading: true,
                    isError: false

                };
            })
            .addCase(FetchRoleByGroup.fulfilled, (state, { payload }) => {

                return {
                    ...state,
                    listRoles: payload.DT,
                    isLoading: false,
                    isError: false,

                };
            })
            .addCase(FetchRoleByGroup.rejected, (state, { payload }) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true
                };
            })
    },
})

export default RoleSlice.reducer