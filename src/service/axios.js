import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',

});

instance.defaults.withCredentials = true
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {

    // let res = {}
    // if (error.response) {
    //     res.data = error.response.data;
    //     res.status = error.response.status;
    //     res.headers = error.response.headers

    // } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser 
    //     // and an instance of http.ClientRequest in node.js
    //     console.log(error.request);
    // } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    // }
    // return res
    const status = error && error.response && error.response.status || 500;
    console('status :', status)
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error('Bạn không có quyền truy cập ! Vui lòng đăng nhập!')
            // window.location.href = '/login'
            // return Promise.reject(error);
            return error.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error(`Bạn không có quyền để xem trang này!`);
            // return Promise.reject(error);
            return;
        }

        // bad request
        case 400: {
            return error.response.data;
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }

    // return Promise.reject(error);
});
export default instance