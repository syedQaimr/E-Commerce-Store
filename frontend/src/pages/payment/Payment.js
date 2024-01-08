import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import { api } from '../../apies/api';
import { useNavigate } from 'react-router-dom'
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
    const Navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const { data } = await api.post(
                "/payment/process",
                paymentData,
            );

            console.log("Yes ::")
            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    console.log("hello");
                    dispatch(createOrder(order));
                    alert.success("Successfully Order place")
                    // Navigate('/orders');

                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch,
        error, alert
    ]);

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />

            <div class="centered-container">
                <div className="orderSummary">
                    <Typography>Payment</Typography>
                    <div>
                        <div className='inputContainer'>
                            <CreditCardIcon className='inputIcon' />
                            <CardNumberElement className="paymentInput" />
                        </div>
                        <div className='inputContainer'>
                            <EventIcon className='inputIcon'/>
                            <CardExpiryElement className="paymentInput" />
                        </div>
                        <div className='inputContainer'>
                            <VpnKeyIcon className='inputIcon'/>
                            <CardCvcElement className="paymentInput" />
                        </div>
                    </div>

                    <input type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="loginBtn" onClick={(e) => submitHandler(e)} />

                </div>
            </div>
        </>
    );
};

export default Payment;