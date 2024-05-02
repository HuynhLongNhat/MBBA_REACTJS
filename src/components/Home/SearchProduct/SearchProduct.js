import React, { useState } from "react"
import logo from "../../../asset/logo_xanhdecor.png"
import Cart_product from "../Cart_product/Cart_product";
import "./SearchProduct.scss"
const SearchProduct = () => {
    const [closeHideCart, setCloseHideCart] = useState(false);
    const handleShowHideCart = () => {
        setCloseHideCart(!closeHideCart)
    }
    return (<>
        <div className="home-container">
            <div className="container">
                <div className="row">
                    <div className="row product-header mt-3">
                        <div className="col-2 header-cart">
                            <img
                                src={logo}
                                width="200"
                                height="100"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </div>
                        <div className="col-9 product-search">

                            <input className="form-control input-search " placeholder="Bạn muốn tìm loại cây gì?"></input>
                            <button className='btn btn-success btn-search mx-1'><i className="fa fa-search"> Tìm kiếm</i></button>
                        </div>
                        <div className='col-1 product-cart' onClick={() => handleShowHideCart()}>
                            {/* <Cart_product closeHideCart={closeHideCart} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SearchProduct;