import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { handleLoginUser } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik"
import "./Login.scss"
const Login = () => {
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false)
    const isLoading = useSelector((state) => state.user.isLoading);
    const user = useSelector((state) => state.user.user)
    let navigate = useNavigate()
    const navigateRegister = () => {
        navigate('/register')
    }
    const formik = useFormik({
        initialValues: {
            valueLogin: "",
            password: ""
        },
        validationSchema: Yup.object({
            valueLogin: Yup.string()
                .required("Vui lòng nhập email hoặc số điện thoại!")
                .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$|^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,14}(?! +$)$/,
                    "Vui lòng nhập email hoặc số điện thoaị hợp lệ hợp lệ!"),

            password: Yup.string()
                .required("Vui lòng nhập mật khẩu!")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Mật khẩu của bạn phải tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, một số và một ký tự đặc biệt!"),


        }),
        onSubmit: (values) => {
            handleLogin(values)

        }
    })

    useEffect(() => {
        if (user && user.auth === true) {
            navigate('/')
        }
    }, [user])
    const handleLogin = async (data) => {
        let res = dispatch(handleLoginUser({
            valueLogin: data.valueLogin,
            password: data.password
        }))
        if (res) {
            navigate('/')
        }


    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }
    return (<>
        <div className="login-container ">
            <div className="container">
                <div className="row  px-3 px-sm-0">
                    <div className="content-left d-none col-sm-7 d-sm-block">
                        {/* <div className="brand">Long Nhat</div>
                        <div className="detail">Fullstack web developer....</div> */}
                    </div>

                    <div className="content-right col-12 col-sm-5  d-flex flex-column gap-3 py-3 ">
                        <form onSubmit={formik.handleSubmit}>


                            <div className="brand  d-block d-sm-none ">Long Nhat</div>
                            <div className="form-group">
                                <label className="">Email hoặc số điện thoại <span className="text-danger">(*)</span></label>
                                <input
                                    type="text"
                                    id="valueLogin"
                                    name="valueLogin"
                                    className={
                                        "form-control"
                                    }
                                    value={formik.values.valueLogin}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.valueLogin && (
                                    <p className="err-message">{formik.errors.valueLogin}</p>
                                )}
                            </div>
                            <div className="form-group input-password">
                                <label className="">Mật khẩu<span className="text-danger">(*)</span></label>
                                <input

                                    type={isShowPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={
                                        "form-control"
                                    }

                                    value={formik.values.password}
                                    onChange={formik.handleChange}

                                />
                                <i onClick={() => setIsShowPassword(!isShowPassword)} className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                {formik.errors.password && (
                                    <p className="err-message">{formik.errors.password}</p>
                                )}
                            </div>
                            <button className="btn btn-primary mt-3 w-100" type="submit"
                                onKeyDown={(event) => handlePressEnter(event)}
                            >

                                Đăng nhập
                            </button>
                        </form>
                        <span className="text-center ">
                            <a className="forgot-password" href="#">
                                Quên mật khẩu
                            </a>
                        </span>
                        <hr></hr>
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={() => navigateRegister()}
                            >
                                Bạn chưa có tài khoản ? Đăng ký ngay!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Login;