import React, { useEffect } from 'react';
import logo from "../Assets/logo.svg";
import { Link } from 'react-router-dom';
import "../styles/ThankYouPage.css"
import { useLocation } from 'react-router-dom';
import { Card, CardText } from 'reactstrap';
import HomePageFooter from "../components/HomePageFooter"

const ThankYouPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const location = useLocation();
    const { formData, totalAmount, additionalCost, adet } = location.state;

    console.log(formData);

    let siparisNotu = null;
    if (formData.siparisNotu !== "") {
        siparisNotu = <p>Sipariş Notu: <span>{formData.siparisNotu}</span></p>;
    }

    return (<>
        <div className='thank-you-header flex justify-center p-2.5'>
            <Link to="/">
                <img alt="Teknolojik Yemekler" src={logo} />
            </Link></div>
        <div className='thank-you-main'>
            <div className='thank-you-container'>
                <div className="siparis-alindi">
                    <div>
                        <p>lezzetin yolda</p>
                        <h2>SİPARİŞ ALINDI </h2>
                    </div>
                </div>
                <p className='thanks-name text-center text-2xl mb-3'>Siparişin için teşekkürler <span>{formData.name}</span>. Yemeğini özenle hazırlıyoruz. 🙂</p>
                <div className='siparis-ozeti'>
                    <h4 className='text-center mb-1 mt-5 font-medium text-2xl'>{formData.foodName}</h4>

                    <div className="itemized">
                        <p>Boyut: <span>{formData.size}</span></p>
                        <p>Hamur: <span>{formData.hamur}</span></p>
                        <p>Ek Malzemeler: <span>{formData.topping.join(", ")}</span></p>
                        {siparisNotu}
                        <hr style={{ marginTop: "10%" }}></hr>
                        <h4 className='mt-3 text-lg font-bold'>Teslimat Bilgileri</h4>
                        <p>İsim: <span>{formData.name}</span></p>
                        <p>Email: <span style={{ textTransform: "none" }}>{formData.email}</span></p>
                        <p>Telefon: <span>{formData.phone}</span></p>
                        <p>Adres: <span>{formData.address}</span></p>
                    </div>
                    <Card body className="ozet-card">
                        <CardText>
                            <table className="total-table">
                                <tbody>
                                    <tr>
                                        <td><h5 className='font-medium text-lg mb-2'>Sipariş Toplamı</h5></td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr className="secimler-ozet">
                                        <td><h6 className=' text-lg mb-2'>Seçimler:</h6></td>
                                        <td><h6 className=' text-lg mb-2 font-medium'>{(adet * additionalCost).toFixed(2)}₺</h6></td>
                                    </tr>
                                    <tr className="total-ozet">
                                        <td><h6 className=' text-lg mb-2'>Toplam:</h6></td>
                                        <td><h6 className=' text-lg mb-2 font-medium'>{(adet * totalAmount).toFixed(2)}₺</h6></td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardText>
                    </Card>

                </div>
            </div>
            <div className='empty-space'></div>
        </div>
        <HomePageFooter />
    </>
    );
};

export default ThankYouPage;