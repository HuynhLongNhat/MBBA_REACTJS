import "./Cart_product.scss"
import Cart from "../../../asset/empty-cart.webp"
const Cart_product = (props) => {
    const { closeHideCart } = props
    return (
        <>

            < div className="cart-product-container" >
                < div className="header-cart" >

                    <i className="fa fa-shopping-cart"></i>
                    {closeHideCart &&
                        <div className="header-cart-no-cart">

                            <img src={Cart}></img>


                        </div>
                    }
                </div >
            </div >

        </>
    )

}
    ;


export default Cart_product;