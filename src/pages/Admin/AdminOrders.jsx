import React, { useEffect, useState } from 'react';
import AdminMenu from "../../components/Layout/AdminMenu";
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Select, message } from 'antd';
import Layout from '../../components/Layout/Layout';

const { Option } = Select;

const AdminOrders = () => {
    const [statusOptions] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]);
    const [orders, setOrders] = useState([]);

    const { token } = useSelector((state) => state.auth);

    // ऑर्डर डेटा लाने का फ़ंक्शन
    const getOrders = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/all-orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            message.error('Failed to fetch orders. Please try again later.');
        }
    };

    useEffect(() => {
        getOrders();
    }, [token]);

    // ऑर्डर स्टेटस अपडेट फ़ंक्शन
    const handleChange = async (orderId, newStatus) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/auth/order-status/${orderId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            message.success('Order status updated successfully');
            getOrders(); // डेटा रिफ्रेश करें
        } catch (error) {
            console.error("Error updating order status:", error);
            message.error('Failed to update status. Try again later.');
        }
    };

    return (
        <Layout>
            <div className="container-fluid p-2">
                <div className="row">
                    {/* 🏠 Sidebar Menu */}
                    <div className="col-12 col-md-3 mb-3">
                        <AdminMenu />
                    </div>

                    {/* 📦 Orders Section */}
                    <div className="col-12 col-md-9">
                        <h2 className="text-primary text-center">🛍️ All Orders</h2>

                        {orders.length === 0 ? (
                            <p className="text-center">No orders found</p>
                        ) : (
                            orders.map((order, index) => (
                                <div className="card shadow-sm mb-4 p-3" key={order._id}>
                                    {/* 🖥 Desktop View (Table) */}
                                    <div className="d-none d-md-block">
                                        <table className="table table-sm table-bordered text-center">
                                            <thead className="table-primary">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Status</th>
                                                    <th>Buyer</th>
                                                    <th>Date</th>
                                                    <th>Payment</th>
                                                    <th>Qty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) => handleChange(order._id, value)}
                                                            defaultValue={order.status}
                                                            style={{ width: 150 }}
                                                        >
                                                            {statusOptions.map((s, i) => (
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{order?.buyer?.name || "Unknown"}</td>
                                                    <td>{moment(order.createdAt).fromNow()}</td>
                                                    <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{order.products?.length || 0}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* 📱 Mobile View (Vertical Format) */}
                                    <div className="d-block d-md-none order-mobile-card">
                                        <p><strong>#</strong> {index + 1}</p>
                                        <p><strong>Status:</strong>
                                            <Select
                                                bordered={false}
                                                onChange={(value) => handleChange(order._id, value)}
                                                defaultValue={order.status}
                                                style={{ width: "100%" }}
                                            >
                                                {statusOptions.map((s, i) => (
                                                    <Option key={i} value={s}>{s}</Option>
                                                ))}
                                            </Select>
                                        </p>
                                        <p><strong>Buyer:</strong> {order?.buyer?.name || "Unknown"}</p>
                                        <p><strong>Date:</strong> {moment(order.createdAt).fromNow()}</p>
                                        <p><strong>Payment:</strong> {order?.payment?.success ? "Success" : "Failed"}</p>
                                        <p><strong>Qty:</strong> {order.products?.length || 0}</p>
                                    </div>
                                    {/*  Ordered Products */}
                                    <div className="container">
                                        <div className="row">
                                            {order.products?.map((product) => (
                                                <div className="col-6 col-md-4 col-lg-3 mb-3" key={product._id}>
                                                    <div className="card p-2 shadow-sm h-100">
                                                        {/* 📸 Product Image */}
                                                        <div className="text-center">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                                                                className="img-fluid rounded"
                                                                alt={product.name}
                                                                style={{ maxWidth: "80px", height: "auto" }}
                                                            />
                                                        </div>

                                                        {/* 📝 Product Details */}
                                                        <div className="text-center mt-2">
                                                            <h6 className="text-primary m-0">{product.name}</h6>
                                                            <p className="text-muted m-0 small-text">
                                                                {product.description.substring(0, 30)}...
                                                            </p>
                                                            <p className="m-0"><strong>💰 Price:</strong> ${product.price}</p>
                                                            <p className="m-0"><strong>📦 Qty:</strong> {product.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default AdminOrders;

