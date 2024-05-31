import Cookies from 'js-cookie';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    LoginUser,
    registerNewUser,
    GetAllUser,
    getAllGroup,
    CreateNewUserUser,
    DeleteAUser,
    UpdateUser,
} from "../../service/userService"
import { toast } from "react-toastify";

export const handleLoginUser = createAsyncThunk(
    "user/login-user",
    async (data) => {
        const res = await LoginUser(data);

        localStorage.setItem('token', res.DT.access_token);
        localStorage.setItem("email", res.DT.email)
        localStorage.setItem("username", res.DT.username);
        localStorage.setItem("groupWithRoles", res.DT.groupWithRoles.name);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const handleRegisterUser = createAsyncThunk(
    "user/register-user",
    async (data) => {
        const res = await registerNewUser(data);

        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const handleRefresh = createAsyncThunk(
    "user/refresh",
    async () => {

    }
)
export const LogOutUser = createAsyncThunk(
    "user/log-out",
    async () => {

    }
)

export const FetchAllUser = createAsyncThunk(
    "user/getAllUser",
    async () => {
        const res = await GetAllUser();
        if (res && res.EC === 0) {
            // toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const FetchAllGroup = createAsyncThunk(
    "user/getAllGroup",
    async () => {
        const res = await getAllGroup();
        if (res && res.EC === 0) {
            // toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)

export const createNewUser = createAsyncThunk(
    "user/createNewUser",
    async (dataUser, { dispatch }) => {
        const res = await CreateNewUserUser(dataUser);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(FetchAllUser())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (dataUser, { dispatch }) => {
        const res = await DeleteAUser(dataUser);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(FetchAllUser())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (dataUser, { dispatch }) => {
        const res = await UpdateUser(dataUser);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(FetchAllUser())
        }
        else {
            toast.error(res.EM)
        }
        return res;
    }
)
const initialState = {
    user: {
        groupWithRoles: '',
        email: '',
        username: '',
        auth: null,
        token: ''
    },
    isLogin: false,
    isLoading: false,
    isError: false,
    ListUser: [],
    ListGroup: []

}


export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleLoginUser.pending, (state) => {
                return {
                    ...state,
                    user: {
                        auth: false
                    },
                    isLogin: false,
                    isLoading: true,
                    isError: false

                };
            })
            .addCase(handleLoginUser.fulfilled, (state, { payload }) => {

                return {
                    ...state,
                    user: {
                        email: payload.DT.email,
                        token: payload.DT.access_token,
                        username: payload.DT.username,
                        auth: true,
                        groupWithRoles: payload.DT.groupWithRoles,
                    },
                    isLogin: true,
                    isLoading: false,
                    isError: false,

                };
            })
            .addCase(handleLoginUser.rejected, (state, { payload }) => {
                return {
                    ...state,
                    user: {
                        auth: false
                    }
                    ,
                    isLogin: false,
                    isLoading: false,
                    isError: true
                };
            })
            .addCase(handleRefresh.fulfilled, (state, { payload }) => {

                return {
                    ...state,
                    user: {
                        email: localStorage.getItem('email'),
                        token: localStorage.getItem('token'),
                        username: localStorage.getItem('username'),
                        groupWithRoles: localStorage.getItem('groupWithRoles'),
                        auth: true
                    },
                    isLogin: true,
                    isLoading: false,
                    isError: false,
                };
            })
            .addCase(LogOutUser.fulfilled, (state, { payload }) => {
                localStorage.removeItem('token')
                localStorage.removeItem('email')
                localStorage.removeItem('username')
                localStorage.removeItem('groupWithRoles')
                Cookies.remove('token');

                return {
                    ...state,
                    user: {
                        email: '',
                        token: '',
                        auth: false
                    },
                    isLogin: false,
                    isLoading: false,
                    isError: false,
                };

            })
            .addCase(FetchAllUser.pending, (state) => {
                return {
                    ...state,

                    isLoading: true,
                    isError: false

                };
            })
            .addCase(FetchAllUser.fulfilled, (state, { payload }) => {

                return {
                    ...state,
                    ListUser: payload.DT,
                    isLoading: false,
                    isError: false,

                };
            })
            .addCase(FetchAllUser.rejected, (state, { payload }) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true
                };
            })
            .addCase(FetchAllGroup.pending, (state) => {
                return {
                    ...state,

                    isLoading: true,
                    isError: false

                };
            })
            .addCase(FetchAllGroup.fulfilled, (state, { payload }) => {

                return {
                    ...state,
                    ListGroup: payload.DT,
                    isLoading: false,
                    isError: false,

                };
            })
            .addCase(FetchAllGroup.rejected, (state, { payload }) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true
                };
            })

    },
})

export default UserSlice.reducer