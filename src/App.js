
import './App.scss';
import NavHeader from './navigations/NavHeader';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'font-awesome/css/font-awesome.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-markdown-editor-lite/lib/index.css";
import { ToastContainer } from "react-toastify";
import { handleRefresh } from "./redux/slices/UserSlice"
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/containers/Header/Header';
import SideBar from './components/Sidebar/Sidebar';
// import 'antd/dist/antd.scss';
function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleRefresh())
    }
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <NavHeader />
        {isLogin && <Header />}
        <div className='content'>
          <div className='side-bar'>

            <SideBar />
          </div>
          <div className='app-route'>

            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition: Bounce,
      />
    </div>
  );
}

export default App;
