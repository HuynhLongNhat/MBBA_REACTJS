import React from 'react'
import "./Home.scss"
import Header from './Header/Header'
import Section_Home from './Section/Section_Home'



import Section_questions from './Section/Section_questions'
import Section_Contact from './Section/Section_Contact'
import Footer from './Footer/Footer'


import Section_outstanding_products from './Section/Section_outstanding_products'
import Section_handbook from './Section/Section_handBook'
import Section_Category from './Section/Section_Category'
const Home = (props) => {
    return (
        <div className='container-header'>
            <Header />
            {/* CATEGORY_MENU */}
            <div className='category_menu'>

                {/* SECTION */}
                <div className='content'>
                    <Section_Home />
                </div>
            </div>
            <div className='mb-3 category_product mt-5'>
                <Section_Category />
            </div>

            <div className='mb-3 outstanding-product mt-5'>
                <Section_outstanding_products />
            </div>
            <div className='mt-3 handbook'>
                <Section_handbook />
            </div>
            <Section_Contact />
            <Footer />
        </div>
    )
}

export default Home
