import React from "react"
import "../styles/HomePage.css"
import { Col, Container, Row } from "reactstrap"
import icon1 from "../Assets/adv-aseets/icons/1.svg"
import icon2 from "../Assets/adv-aseets/icons/2.svg"
import icon3 from "../Assets/adv-aseets/icons/3.svg"
import icon4 from "../Assets/adv-aseets/icons/4.svg"
import icon5 from "../Assets/adv-aseets/icons/5.svg"
import icon6 from "../Assets/adv-aseets/icons/6.svg"
import food1 from "../Assets/adv-aseets/food-1.png"
import food2 from "../Assets/adv-aseets/food-2.png"
import food3 from "../Assets/adv-aseets/food-3.png"
import star from "../Assets/star.png"
import { Link } from "react-router-dom"
import "../styles/responsive.css"


const HomePageMain = () => {
    const rate = <img alt="star" className="float-left mt-1 w-5 pr-1" src={star} />
    const siparisButton = <button className="siparis-ver">SİPARİŞ VER</button>

    return (
        <div className="home-main-section">
            <Container className="main-container">
                <Row className="hero-banners">
                    <div className="half-cols">
                        <Col className="ozel-lezzetus">
                            <h2>Özel<br />Lezzetus</h2>
                            <p>Position: Absolute Acı Pizza</p>
                            <Link to="/pizza">{siparisButton}</Link>
                        </Col>
                    </div>
                    <div className="half-cols">
                        <Col className="hackathlon">
                            <h2>Hackathlon<br />Burger Menu</h2>
                            {siparisButton}
                        </Col>
                        <Col className="hizli-kurye">
                            <h2><span>Çoooook</span> hızlı<br />npm gibi kurye</h2>
                            {siparisButton}
                        </Col></div>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <div className="home-food-filter">
                            <p>en çok paketlenen menüler</p>
                            <h3>Acıktıran Kodlara Doyuran Lezzetler</h3>
                        </div>
                        <div className="home-filtreler">
                            <div className="header-icons"><img alt="food item" src={icon1} /> <span>YENİ! Kore</span></div>
                            <div className="header-icons active"><img alt="food item" src={icon2} /> <span>Pizza</span></div>
                            <div className="header-icons"><img alt="food item" src={icon3} /> <span>Burger</span></div>
                            <div className="header-icons"><img alt="food item" src={icon4} /> <span>Kızartmalar</span></div>
                            <div className="header-icons"><img alt="food item" src={icon5} /> <span>Fast Food</span></div>
                            <div className="header-icons"><img alt="food item" src={icon6} /> <span>Gazlı İçecekler</span></div>
                        </div>
                        <div className="food-cards">
                            <div>
                                <img alt="food" src={food1} />
                                <h4>Terminal Pizza</h4>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-6/12">
                                                <p><span>{rate}</span>4.9</p>
                                            </td>
                                            <td className="w-6/12">
                                                <p>(200)</p>
                                            </td>
                                            <td className="w-6/12">
                                                <p className="food-info-price">60₺</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <img alt="food" src={food2} />
                                <h4>Position Absolute Acı Pizza</h4>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-6/12">
                                                <p><span>{rate}</span>4.9</p>
                                            </td>
                                            <td className="w-6/12">
                                                <p>(928)</p>
                                            </td>
                                            <td className="w-6/12">
                                                <p className="food-info-price">85₺</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <img alt="food" src={food3} />
                                <h4>useEffect Tavuklu Burger</h4>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-6/12">
                                                <p><span>{rate}</span>4.9</p>
                                            </td>
                                            <td className="w-6/12">
                                                <p>(462)</p>
                                            </td>
                                            <td className="w-6/12">
                                                <p className="food-info-price">75₺</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePageMain