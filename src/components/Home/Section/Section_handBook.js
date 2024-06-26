
import React, { useRef } from 'react';
import pd1 from "./assets/img/product1.png"
import pd2 from "./assets/img/product2.png"
import pd3 from "./assets/img/product3.png"
import pd4 from "./assets/img/product4.png"
import pd5 from "./assets/img/product5.png"
import pd6 from "./assets/img/product6.png"
import { Carousel, Button } from 'antd';
import "./Section_outstanding_products.scss"

const Section_handbook = () => {

    const carouselRef = useRef();


    return (
        <>
            <div>
                <h3 className='text-center mb-4'> Cẩm nang</h3>
            </div>
            <Carousel ref={carouselRef} arrows infinite={false} slidesToShow={4} slidesToScroll={1}>
                <div class="product__card" >
                    <img src={pd1} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd2} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd3} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd4} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd5} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card" >


                    <img src={pd6} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd1} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd2} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd3} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
                <div class="product__card">


                    <img src={pd4} alt="" class="product__img m-auto" />

                    <h3 class="product__title">Cacti Plant</h3>
                    <span class="product__price">$19.99</span>

                </div>
            </Carousel>
        </>

    )
}

export default Section_handbook
