import React from "react"
import halfPizza from "../Assets/adv-aseets/adv-form-banner.png"
import star from "../Assets/star.png"

const ProductPageHead = (props) => {

    const {pizzaForm,selectedPizzaPrice} = props;

    return (
        <div className="product-hero">
                <div className="image-container">
                    <img src={halfPizza} alt="Half Pizza" className="centered-image" />
                </div>
                <div className="product-hero-container">
                    <p className="mt-3 mb-3">Anasayfa - Seçenekler - <span style={{color:"#CE2829"}}>Sipariş Oluştur</span></p>
                    <h3 className="mb-3 mt-1 font-medium text-2xl">Position Absolute Acılı Pizza</h3>
                    <div className="mb-3">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="w-6/12"><p className="food-info-price">{selectedPizzaPrice}₺<span> {pizzaForm.size} Boy</span></p></td>
                                    <td className="w-6/12"><p><span><img className="float-left mt-1 w-5 pr-1" src={star} /></span>4.9</p></td>
                                    <td className="w-6/12"><p>(200)</p></td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <p>Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.</p>
                </div>
            </div>
    )
}

export default ProductPageHead