import { useEffect, useState } from 'react';
import './Home.scss';
import banner1 from "../../asset/banner1.jpg";
import banner2 from "../../asset/banner2.jpg";
import banner3 from "../../asset/banner3.jpg";
import banner4 from "../../asset/banner4.jpg";
import banner5 from "../../asset/banner5.jpg";
import Footer from './Footer/Footer';
import Category_product from './Category_product/Category_product';
import New_product from './New_product/New_product';
import Post_product from './Post_product/Post_product';
import Send_email from './Send_email/Send_email';
import SearchProduct from './SearchProduct/SearchProduct';
const Home = () => {
    let arrBanner = [banner1, banner2, banner3, banner4, banner5]
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCurrentBannerIndex(prevIndex => (prevIndex + 1) % arrBanner.length)
        }, 5000)


    }, [])
    return (
        <div className='home-container'>
            <div className='container'>
                <SearchProduct />
                <div className='banner mt-3'>
                    <img className='img-banner shadow  mb-5 bg-white rounded' src={arrBanner[currentBannerIndex]} ></img>
                </div>

                <New_product />
                <Category_product />
                <Post_product />
                <Send_email />
            </div>
            <Footer />
        </div>

    );
}

export default Home;