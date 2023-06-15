import React from "react";
import logo from "../Assets/logo.svg"
import "../styles/ProductPage.css"
import { Link } from "react-router-dom";
import ProductPageForm from "../components/ProductPageForm";
import HomePageFooter from "../components/HomePageFooter"


const ProductPage = () => {
    return (
        <>
        <div className="home-page-header flex justify-center p-2.5">
            <Link to="/"><img src={logo} /></Link>
        </div>
            <ProductPageForm />
            <HomePageFooter/>
        </>
    )
}

export default ProductPage;