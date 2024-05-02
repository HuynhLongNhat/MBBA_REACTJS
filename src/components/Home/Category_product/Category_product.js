import "./Category_product.scss"
import senda from "../../../asset/Sen-đá-viền-đỏ---sen-đá-Viền-Lửa.jpg"
const Category_product = () => {
    return (<div className="category_product-container">
        <div className='row list-product'>
            <div className='title-category'>
                <span>Danh mục cây cảnh </span>
            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>


            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>

            </div>
            <div className='col-4 product'>
                <img src={senda}></img>
                <div className='product-title'>Sen đá casio</div>
                <div className='product-cost'>15.000 <sup>đ</sup></div>
            </div>

        </div>
    </div>);
}

export default Category_product;