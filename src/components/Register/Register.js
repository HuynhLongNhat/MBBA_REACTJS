import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../service/userService"
import { toast } from "react-toastify";
import "./Register.scss"
import { useFormik } from "formik";
import * as Yup from "yup"
const Register = () => {
    let navigate = useNavigate();

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowRePassword, setIsShowRePassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmedPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Vui lòng nhập đầy đủ họ tên!")
                .min(4, "Độ dài tên phải lớn hơn 4 ký tự!"),

            email: Yup.string()
                .required("Vui lòng nhập email!")
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Vui lòng nhập email hợp lệ!"),
            password: Yup.string()
                .required("Vui lòng nhập mật khẩu!")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Mật khẩu của bạn phải tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, một số và một ký tự đặc biệt!"),

            phone: Yup.string()
                .required("Vui lòng nhập số điện thoại!")
                .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, "Vui lòng nhập số điện thoại hợp lệ"),
            confirmedPassword: Yup.string()
                .required("Vui lòng nhập lại mật khẩu!")
                .oneOf([Yup.ref('password'), null], "Mật khẩu nhập lại không trùng khớp!"),
        }),
        onSubmit: (values) => {
            handleRegister(values)
        }
    })


    const navigateLogin = () => {
        navigate('/login')
    }

    const handleRegister = async (data) => {
        let serverData = await registerNewUser({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password
        })

        if (serverData.EC === 0) {
            toast.success(serverData.EM);
            navigate('/login')
        }
        else {
            toast.error(serverData.EM)
        }

    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleRegister();
        }
    }

    return (<>
        <div className="register-container ">
            <div className="container">
                <div className="row   px-3 px-sm-0">
                    <div className="content-left d-none col-sm-7 d-sm-block">
                        {/* <div className="brand">Long Nhat</div>
                        <div className="detail">Fullstack web developer....</div> */}
                    </div>

                    <div className="content-right col-12 col-sm-5  d-flex flex-column gap-3 py-3 ">
                        <div className="brand  d-block d-sm-none ">Đăng kí</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label className="">Họ và tên <span className="text-danger">(*)</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={
                                        "form-control"
                                    }
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.name && (
                                    <p className="err-message">{formik.errors.name}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="">Email <span className="text-danger">(*)</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={
                                        "form-control"
                                    }
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.email && (
                                    <p className=" err-message">{formik.errors.email}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="">Số điện thoại <span className="text-danger">(*)</span></label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className={
                                        "form-control"
                                    }
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.phone && (
                                    <p className=" err-message">{formik.errors.phone}</p>
                                )}
                            </div>

                            <div className="form-group input-password">
                                <label className="">Mật khẩu <span className="text-danger">(*)</span></label>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className={
                                        "form-control"
                                    }
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <i onClick={() => setIsShowPassword(!isShowPassword)} className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                {formik.errors.password && (
                                    <p className=" err-message">{formik.errors.password}</p>
                                )}
                            </div>
                            <div className="form-group input-password">
                                <label className="">Nhập lại mật khẩu <span className="text-danger">(*)</span></label>
                                <input
                                    type={isShowRePassword ? "text" : "password"}
                                    id="confirmedPassword"
                                    name="confirmedPassword"
                                    className={
                                        "form-control"
                                    }
                                    value={formik.values.confirmedPassword}
                                    onChange={formik.handleChange}
                                />
                                <i onClick={() => setIsShowRePassword(!isShowRePassword)} className={isShowRePassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                {formik.errors.confirmedPassword && (
                                    <p className=" err-message">{formik.errors.confirmedPassword}</p>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary mt-3 w-100"
                                onKeyDown={(event) => handlePressEnter(event)}
                            >
                                Đăng ký
                            </button>
                        </form>

                        <hr></hr>
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={() => navigateLogin()}
                            >
                                Bạn đã có tài khoản ? Đăng nhập ngay!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Register;