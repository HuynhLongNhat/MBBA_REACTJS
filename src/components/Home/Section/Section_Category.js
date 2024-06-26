
import React, { useEffect, useRef } from 'react';

import {
    fetchAllTypeProducts,


} from "../../../redux/slices/ProductSlice";
import { Carousel, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import "./Section_Category.scss"

const Section_Category = () => {

    const carouselRef = useRef();
    const dispatch = useDispatch();
    const listTypeProduct = useSelector((state) => state.product.listTypeProduct.DT)
    useEffect(() => {
        let res = dispatch(fetchAllTypeProducts());
        console.log('data :', listTypeProduct)
    }, [])
    return (
        <>
            <div>
                <h3 className='text-center mb-4'> Danh mục sản phẩm</h3>
            </div>
            <Carousel ref={carouselRef} arrows infinite={false} slidesToShow={4} slidesToScroll={1}>
                {listTypeProduct && listTypeProduct.length > 0
                    && listTypeProduct.map((item, index) => {
                        return (
                            <div class="product__card" >
                                <div className="product__img  image-product m-auto" style={{
                                    backgroundImage: `url(${item.image})`,
                                }} >

                                </div>
                                <h3 class="product__title">{item.name}</h3>


                            </div>
                        )
                    })}


            </Carousel>
        </>

    )
}

export default Section_Category
