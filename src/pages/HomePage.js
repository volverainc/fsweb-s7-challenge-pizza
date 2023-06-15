import React from "react"
import "../styles/HomePage.css"
import HomePageHeader from "../components/HomePageHeader"
import HomePageMain from "../components/HomePageMain"
import HomeHeaderBar from "../components/HomeHeaderBar"
import HomePageFooter from "../components/HomePageFooter"


const HomePage = () => {
    return (
        <>
        <HomePageHeader/>
        <HomeHeaderBar/>
        <HomePageMain/>
        <HomePageFooter/>
        </>
    )
}

export default HomePage