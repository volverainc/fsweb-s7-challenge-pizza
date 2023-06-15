import React from "react"
import "../styles/HomePage.css"
import { foodItems } from "../datas/foodCategories"

const HomeHeaderBar = () => {
    return (
        <div className="header-bar">
            {foodItems.map((item) => (
                <div className="header-icons">
                    <img alt="food item" src={item.img} />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    )
}

export default HomeHeaderBar;