
import './App.scss';
import NavHeader from './navigations/NavHeader';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'font-awesome/css/font-awesome.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-markdown-editor-lite/lib/index.css";
import { ToastContainer } from "react-toastify";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import ManageTypeProduct from './components/containers/Admin/ManageProduct/ManageTypeProduct/ManageTypeProduct';
import ManageProduct from './components/containers/Admin/ManageProduct/ManageProduct/ManageProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/product" element={<div>Product</div>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/manage-products/product" element={<ManageProduct />} />
          <Route path="/manage-products/type-product" element={<ManageTypeProduct />} />
        </Routes>
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
