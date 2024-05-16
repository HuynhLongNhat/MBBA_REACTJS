import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../service/userService"
import { toast } from "react-toastify";
const Register = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    // mặc định cho các trường có validate là true
    const defaultValidInput = {
        isValidName: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    const navigateLogin = () => {
        navigate('/login')
    }
    const isValidInput = () => {
        setObjCheckInput(defaultValidInput);
        if (!name) {
            toast.error("Vui lòng nhập họ và tên!");
            setObjCheckInput({ ...defaultValidInput, isValidName: false });
            return false;
        }
        if (!email) {
            toast.error("Vui lòng nhập email!");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /^\S+@\S+\.\S+$/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            toast.error("Email này không hợp lệ");
            return false;
        }
        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!userName) {
            toast.error("Vui lòng nhập tên đăng nhập!");
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
            return false;
        }
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu của bạn không giống nhau!");
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        } else {
            return true;
        }
    }

    const handleRegister = async () => {
        let check = isValidInput()
        if (check === true) {

            let serverData = await registerNewUser({
                name,
                email,
                phone,
                userName,
                password
            })

            if (serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login')
            }
            else {
                toast.error(serverData.EM)
            }
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
                        <div className="form-group">
                            <label className="">Họ và tên <span className="text-danger">(*)</span></label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidName
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="">Email <span className="text-danger">(*)</span></label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidEmail
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label className="">Số điện thoại <span className="text-danger">(*)</span></label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidPhone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label className="">Tên đăng nhập <span className="text-danger">(*)</span></label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidUsername
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label className="">Mật khẩu <span className="text-danger">(*)</span></label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label className="">Nhập lại mật khẩu <span className="text-danger">(*)</span></label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidConfirmPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => handleRegister()}
                            onKeyDown={(event) => handlePressEnter(event)}
                        >
                            Đăng ký
                        </button>

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