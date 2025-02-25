import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux"; // Redux Hooks
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart } from "../Redux/Slices/cartSlices"; // Redux action
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import "../styles/CartStyles.css";

const CartPage = () => {
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();  // Redux Dispatch

    // ✅ Redux से `cart` और `auth` स्टेट एक्सेस करें
    const cart = useSelector((state) => state.cart.items);
    const auth = useSelector((state) => state.auth);

    // useEffect(() => {
    //     console.log("🔹 Auth State:", auth);
    //     console.log("🔹 Cart Items:", cart);
    //     console.log("🔹 Client Token:", clientToken);
    //     console.log("🔹 DropIn Instance:", instance);
    // }, [auth, cart, clientToken, instance]);

    // 🛒 आइटम हटाने का सही तरीका (Redux Dispatch के साथ)
    const removeCartItem = (pid) => {
        dispatch(removeFromCart(pid));  // Redux state को update करें
    };

    // ✅ कुल कीमत निकालें
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price * (item.quantity || 1);
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
        } catch (error) {
            console.log("Total Price Error:", error);
            return "$0.00"; // 🔹 Error Handling
        }
    };

    // ✅ Braintree Payment Token लाएं
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product//braintree/token`);
            setClientToken(data?.clientToken);
            // console.log("Braintree Token Fetched:", data?.clientToken);
        } catch (error) {
            console.log("Braintree Token Error:", error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // ✅ पेमेंट हैंडल करें
    const handlePayment = async () => {
        try {
            setLoading(true);
            console.log("Processing Payment...");
            const { nonce } = await instance.requestPaymentMethod();
            // console.log("Payment Nonce Received:", nonce);

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
            });

            console.log("Payment Success Response:", data);
            setLoading(false);
            // localStorage.removeItem("cart");
            // setCart([]);  // 🔹 setCart() काम नहीं करेगा, इसे Redux से मैनेज करें
            dispatch(clearCart());
            navigate("/dashboard/user/orders");
            alert("Payment Completed Successfully!");
        } catch (error) {
            console.log("Payment Error:", error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token ? auth?.user?.name : "Guest"}`}
                        </h1>
                        <h4 className="text-center">
                            {cart.length > 0
                                ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"
                                }`
                                : "Your cart is empty"}
                        </h4>
                    </div>
                </div>

                <div className="row">
                    {/* ✅ Responsive Fix for Cart Items */}
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        {cart?.map((p) => (
                            <div className="row mb-2 card flex-row align-items-center" key={p._id}>
                                <div className="col-4 col-md-3">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top img-fluid"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="col-8 col-md-9">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price: ${p.totalPrice}</p>
                                    <p>Quantity: {p.quantity}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => dispatch(removeFromCart(p._id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Responsive Fix for Cart Summary */}
                    <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total || Checkout || Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>

                        {auth?.user?.address ? (
                            <div className="mb-3">
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => navigate("/dashboard/user/profile")}
                                >
                                    Update Address
                                </button>
                            </div>
                        ) : auth?.token ? (
                            <div className="mb-3">
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => navigate("/dashboard/user/profile")}
                                >
                                    Add Address
                                </button>
                            </div>
                        ) : (
                            <button
                                className="btn btn-outline-warning"
                                onClick={() => navigate("/login", { state: "/cart" })}
                            >
                                Please Login to Checkout
                            </button>
                        )}

                        <div className="mt-2">
                            {clientToken && (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: { flow: "vault" },
                                        }}
                                        onInstance={(instance) => {
                                            setInstance(instance);
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;



