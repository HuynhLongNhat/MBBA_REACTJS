import axios from "axios";
require("dotenv").config();

// Set config defaults when creating the instance
const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL
    baseURL: 'http://localhost:8080/api/v1'
});
instance.defaults.withCredentials = true
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;