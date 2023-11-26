import React from "react";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/customer/process/payment");
    };

    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                    <div class="cart-title">Your Cart Items:</div>
                        <table className="cartTable">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price (per item)</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems &&
                                    cartItems.map((item) => (
                                        <tr key={item.product}>
                                            <td><img src={item.image} alt="Product" /></td>
                                            <td><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.price}</td>
                                            <td>₹{item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;