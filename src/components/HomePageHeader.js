import React from "react"
import "../styles/HomePage.css"
import logo from "../Assets/logo.svg"
import { Link } from 'react-router-dom';


const HomePageHeader = () => {

    return (
        <div className="home-hero">
            <div className="home-page-header flex justify-center p-2.5">
                <Link to="/">
                    <img alt="Teknolojik Yemekler" src={logo} />
                </Link>
            </div>
            <div className="kod-aciktirir">
                <p>fırsatı kaçırma</p>
                <h2>KOD ACIKTIRIR</h2>
                <h2>PIZZA, DOYURUR</h2>
                <Link to="/pizza">
                    <button>ACIKTIM</button>
                </Link>
            </div>
        </div>

    )
}

export default HomePageHeader