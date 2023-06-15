import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import axios from "axios";
import { Col, FormGroup, Input, Label, Row, Card, CardText, FormFeedback } from "reactstrap";
import ProductPageHead from "./ProductPageHead";
import "../styles/ProductPage.css"
import { useHistory } from 'react-router-dom';
import { foodName, size, topping, hamur } from "../datas/FormData"

const ProductPageForm = () => {
    const [pizzaForm, setPizzaForm] = useState({
        size: size[0].value,
        hamur: "",
        topping: [],
        siparisNotu: "",
        foodName: foodName[0].value,
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [formErrs, setFormErrs] = useState({
        hamur: "",
        topping: [],
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [totalAmount, setTotalAmount] = useState(null);
    const [aciktim, setAciktim] = useState([]); /*axios icin*/
    const [valid, setValid] = useState(false);
    const [additionalCost, setAdditionalCost] = useState(0); /*secimler*/
    const redirect = useHistory(); /*siparis onayi sayfasina yonlendirme*/
    const [selectedPizzaPrice, setSelectedPizzaPrice] = useState(null); /*secilen pizza boyut fiyatini gostermek icin*/
    const [adet, setAdet] = useState(1);
    const incrementAdet = () => { setAdet(adet + 1) }
    const reduceAdet = () => { setAdet(adet - 1) }

    if (adet < 1) {
        setAdet(1);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const selectedSize = size.find((s) => s.value === pizzaForm.size);
        if (selectedSize) {
            setTotalAmount(selectedSize.basePrice);
            setSelectedPizzaPrice(selectedSize.basePrice);
        }
    }, [pizzaForm.size]); 

    //validasyon
    const pizzaFormSchema = Yup.object().shape({
        topping: Yup.array()
        .min(4, "En az 4 seçim yapmalısınız.")
        .max(10, "En fazla 10 seçim yapabilirsiniz.")
        .test("values", "Geçersiz", (value) => {
          const availableToppings = topping.map((item) => item.value);
          return value.every((item) => availableToppings.includes(item));
        }),
        name: Yup.string().min(2, "En az 2 karakter girmelisiniz.").required("Lütfen isminizi giriniz."),
        hamur: Yup.string().required("Lütfen hamur kalınlığını seçiniz."),
        email: Yup.string().email("Lütfen geçerli bir email adresi giriniz.").required(),
        phone: Yup.string().phone("TR", "Lütfen telefon numaranızı giriniz.").required(),
        address: Yup.string().min(15, "Lütfen geçerli bir adres giriniz.").required("Lütfen adresinizi giriniz.")
    });

    useEffect(() => {
        pizzaFormSchema.isValid(pizzaForm).then((valid) => setValid(valid));
    }, [pizzaForm]);

    const malzemeCheckbox = (e) => {
        const selectedTopping = e.target.value;

        setPizzaForm((prevState) => {
            let updatedToppings;
            if (prevState.topping.includes(selectedTopping)) {
                updatedToppings = prevState.topping.filter(
                    (topping) => topping !== selectedTopping
                );
            } else {
                if (prevState.topping.length < 10) {
                    updatedToppings = [...prevState.topping, selectedTopping];
                } else {
                    updatedToppings = prevState.topping;
                }
            }

            const selectedCheckboxCount = updatedToppings.length;

            if (selectedCheckboxCount >= 4 && selectedCheckboxCount <= 10) {
                setValid(true);
            } else {
                setValid(false);
            }

            return {
                ...prevState,
                topping: updatedToppings,
            };
        });
    };

    useEffect(() => {
        setAdditionalCost(pizzaForm.topping.length * 5);
    }, [pizzaForm.topping]);

    useEffect(() => {
        const selectedSize = size.find((s) => s.value === pizzaForm.size);
        const additionalCost = (pizzaForm.topping.length * 5) * adet;
        setTotalAmount(selectedSize.basePrice + additionalCost);
    }, [pizzaForm.size, pizzaForm.topping]);


    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        Yup.reach(pizzaFormSchema, name)
            .validate(value)
            .then(() => {
                setFormErrs((prevState) => ({ ...prevState, [name]: "" }));
            })
            .catch((err) => {
                setFormErrs((prevState) => ({ ...prevState, [name]: err.errors[0] }));
            });

        setPizzaForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post("https://reqres.in/api/users", pizzaForm)
            .then((res) => {
                setAciktim([...aciktim, res.data])
                console.log(res.data);
                console.log(pizzaForm);
            })
            .catch((error) => {
                console.error("hata var", error);
            });

        console.log(foodName)

        // ThankYouPage'e yonelt ve datayi tasi
        redirect.push('/siparis-onayi/', { formData: pizzaForm, totalAmount: totalAmount, additionalCost: additionalCost, adet: adet, foodName: pizzaForm.foodName });
    };



    return (
        <>
            <ProductPageHead pizzaForm={pizzaForm} selectedPizzaPrice={selectedPizzaPrice} />
            <div className="product-page-container">
                <form id="pizza-form" onSubmit={submitHandler}>
                    <Row className="boyut-hamur">
                        <Col className="mb-10">
                            <div className="mb-3">
                                <h5 className="font-medium text-lg">Boyut Seç <span className="text-red-600">*</span></h5>
                            </div>
                            
                            <div className="radio-div">
                                {size.map((i) => (
                                    <>
                       <FormGroup check>
                            <Label check >
                                <Input 
                                data-cy="input-size" 
                                checked={pizzaForm.size === i.value} 
                                onChange={(e) => setPizzaForm((prevState) => ({ ...prevState, size: e.target.value }))} 
                                name="size" 
                                id="size" 
                                type="radio" 
                                value={i.value} />
                                <span className="radio-button">{i.label}</span>
                            </Label>
                       </FormGroup>
                                    </>
                                ))}
                            </div>
                        
                        </Col>
                        
                        <Col className="mb-10">
                            <div className="mb-3">
                                <h5 className="font-medium text-lg">Hamur Seç <span className="text-red-600">*</span></h5>
                            </div>
                            
                            <div className="radio-div1 form-group col-md-10">
                                <select 
                                data-cy="input-hamur" 
                                id="hamur" 
                                className="form-control" 
                                value={pizzaForm.hamur} 
                                onChange={(e) => setPizzaForm((prevState) => ({ ...prevState, hamur: e.target.value }))}>
                                <option 
                                value="" 
                                disabled 
                                defaultValue>Hamur Kalınlığını Seçiniz
                                </option>
                                 {hamur.map((i) => (
                                 <option 
                                 invalid={!!formErrs.hamur} 
                                 valid={!!pizzaForm.hamur && !formErrs.hamur} 
                                 key={i.value} 
                                 value={i.value}>{i.label}
                                 </option>
                                    ))}
                                </select>
                        <FormFeedback>{formErrs.hamur}</FormFeedback>
                            </div>
                        
                        </Col>
                    </Row>
                    
                    <Row className="malzemeler-section">
                        <Col className="mb-10">
                            <h5 className="font-medium text-lg mb-2">Ek Malzemeler</h5>
                            <p className="mb-4">En az 4, en fazla 10 malzeme seçebilirsiniz. (+5₺)</p>
                            
                            <div className="malzemeler">
                                {topping.map((i) => (
                                    <>
                                <FormGroup check>
                                    <Label className="font-medium" check>
                                        <Input 
                                        data-cy="input-malzeme" 
                                        name="topping" 
                                        id="topping" 
                                        type="checkbox" 
                                        value={i.value} 
                                        onChange={malzemeCheckbox} 
                                        disabled={pizzaForm.topping.length >= 10 && !pizzaForm.topping.includes(i.value)} 
                                        invalid={!!formErrs.topping} />
                                        {i.label}
                                <FormFeedback>{formErrs.topping}</FormFeedback>
                                    </Label>
                                </FormGroup>
                                    </>
                                ))}
                            </div>

                        </Col>
                    </Row>
                    
                    <Row className="mb-4">
                        <Col>
                            <FormGroup>
                                <h5 className="font-medium text-lg mb-2">Sipariş Notu</h5>
                                <Input 
                                data-cy="input-siparisnotu" 
                                type="textarea" 
                                placeholder="Siparişine eklemek istediğin bir not var mı?" 
                                name="siparisNotu" 
                                id="siparisNotu" 
                                value={pizzaForm.siparisNotu} 
                                onChange={(e) => setPizzaForm((prevState) => ({ ...prevState, siparisNotu: e.target.value }))} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <hr></hr>
                    
                    <Row className="customer-form mb-5 mt-5">
                        <h5 className="font-medium text-2xl mb-4">Teslimat Bilgileri</h5>
                        <Col>
                        <FormGroup>
                            <Label htmlFor="name">Adınız
                                <Input 
                                data-cy="input-isim" 
                                placeholder="Lütfen adınızı giriniz" 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={pizzaForm.name} 
                                onChange={inputChangeHandler} 
                                invalid={!!formErrs.name} 
                                valid={!!pizzaForm.name && !formErrs.name} />
                            <FormFeedback>{formErrs.name}</FormFeedback>
                            </Label>
                        </FormGroup>
                            
                        <FormGroup>
                            <Label htmlFor="email">Email Adresiniz
                                <Input 
                                data-cy="input-email" 
                                placeholder="Lütfen email adresinizi giriniz" 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={pizzaForm.email} 
                                onChange={inputChangeHandler} 
                                invalid={!!formErrs.email} 
                                valid={!!pizzaForm.email && !formErrs.email} />
                            <FormFeedback>{formErrs.email}</FormFeedback>
                            </Label>
                        </FormGroup>
                        </Col>

                        <Col>
                        <FormGroup>
                            <Label htmlFor="phone">Telefon Numaranız
                                <Input 
                                data-cy="input-phone" 
                                placeholder="Ör: 5551234567" 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                value={pizzaForm.phone} 
                                onChange={inputChangeHandler} 
                                invalid={!!formErrs.phone} 
                                valid={!!pizzaForm.phone && !formErrs.phone} />
                            <FormFeedback>{formErrs.phone}</FormFeedback>
                            </Label>
                        </FormGroup>
                            
                        <FormGroup>
                            <Label htmlFor="address">Adresiniz
                                <Input 
                                className="adres" 
                                placeholder="Lütfen tam adresinizi giriniz" 
                                data-cy="input-address" 
                                type="textarea" 
                                id="address" 
                                name="address" 
                                value={pizzaForm.address} 
                                onChange={inputChangeHandler} 
                                invalid={!!formErrs.address} 
                                valid={!!pizzaForm.address && !formErrs.address} />
                            <FormFeedback>{formErrs.address}</FormFeedback>
                            </Label>
                        </FormGroup>
                        </Col>
                    </Row>

                    <Row className="total-section">
                        <Col>
                            <div className="adet-select">
                                <span onClick={reduceAdet}>-</span><span>{adet}</span><span onClick={incrementAdet}>+</span>
                            </div>
                        </Col>

                        <Col>
                            <Card body className="totals">

                                <CardText>
                                    <table className="total-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                <h5 className="font-bold text-lg mb-2">Sipariş Toplamı</h5>
                                                </td>
                                            </tr>
                                            <tr className="total-secimler font-medium text-lg mb-2">
                                                <td>
                                                <h6>Seçimler:</h6>
                                                </td>
                                                <td>
                                                <h6>{(adet * additionalCost).toFixed(2)}₺</h6>
                                                </td>
                                            </tr>
                                            <tr className="total-amount font-medium text-lg mb-2">
                                                <td>
                                                <h6>Toplam:</h6>
                                                </td>
                                                <td>
                                                <h6>{((adet * selectedPizzaPrice) + (additionalCost * adet)).toFixed(2)}₺</h6>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardText>

                                <button 
                                data-cy="input-submit" 
                                type="submit" 
                                id="order-button" 
                                disabled={!valid}>
                                    SİPARİŞ VER
                                </button>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </div>
            </>
    )
}

export default ProductPageForm;