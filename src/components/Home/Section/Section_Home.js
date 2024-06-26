
import React, { useRef } from 'react';
import banner1 from "../../../asset/banner1.jpg"
import banner2 from "../../../asset/banner2.jpg"
import banner3 from "../../../asset/banner3.jpg"
import banner4 from "../../../asset/banner4.jpg"
import banner5 from "../../../asset/banner5.jpg"
import img from "./assets/img/home.png"
import { Carousel, Button } from 'antd';


const Section_outstanding_products = () => {


    return (
        <>

            <section class="home" id="home">
                <div class="home__container container grid">
                    <img src={img} alt="" class="home__img" />

                    <div class="home__data">
                        <h1 class="home__title">

                        </h1>
                        <p class="home__description">
                            Create incredible plant design for your offices or apastaments.
                            Add fresness to your new ideas.
                        </p>
                        <a href="#about" class="button button--flex">
                            Explore <i class="ri-arrow-right-down-line button__icon"></i>
                        </a>
                    </div>

                    <div class="home__social">
                        <span class="home__social-follow">Follow Us</span>

                        <div class="home__social-links">
                            <a href="https://www.facebook.com/" target="_blank" class="home__social-link">
                                <i class="ri-facebook-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" class="home__social-link">
                                <i class="ri-instagram-line"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" class="home__social-link">
                                <i class="ri-twitter-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Section_outstanding_products
