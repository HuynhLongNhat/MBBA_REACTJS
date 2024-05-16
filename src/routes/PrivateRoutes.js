
import Alert from 'react-bootstrap/Alert';
import { useSelector } from "react-redux";
const PrivateRoutes = (props) => {

    const user = useSelector(state => state.user.user)

    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Ôi không!Bạn đã gặp lỗi</Alert.Heading>
                <p>
                    Bạn không có quyền truy cập vào đường link này
                </p>
            </Alert>
        </>
    }
    return (<>
        {props.children}
    </>);
}

export default PrivateRoutes;