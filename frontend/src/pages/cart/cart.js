import React, { Fragment } from "react";
import "./cart.css";
import CartItemCard from "../../components/cartItemCard/CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import {
    addItemsToCard,
    removeItemsFromCart 
} from "../../actions/cartAction";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        console.log(quantity, stock)
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCard(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCard(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/customer/shipping");
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/customer/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput" style={{ display: 'flex', alignItems: 'center' }}>
                                        <button
                                            onClick={() => decreaseQuantity(item.product, item.quantity)}
                                            style={{
                                                background: '#ff6b6b',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                marginRight: 'auto',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            -
                                        </button>
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 5px' }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                                            style={{
                                                background: '#4caf50',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                marginLeft: 'auto',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity
                                        }`}</p>
                                </div>
                            ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;