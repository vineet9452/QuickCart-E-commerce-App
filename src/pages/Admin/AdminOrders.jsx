// import React, { useEffect, useState } from 'react'
// import AdminMenu from "../../components/Layout/AdminMenu"
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import moment from 'moment'
// import { Select } from 'antd';
// import Layout from '../../components/Layout/Layout';
// const { Option } = Select;

// const AdminOrders = () => {
//     const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
//     const [changeStatus, setChangeStatus] = useState("")
//     const [orders, setOrders] = useState([]);
//     const auth = useSelector((state) => state.auth);

//     const getOrders = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/all-orders`, {
//                 headers: {
//                     Authorization: `Bearer ${auth?.token}`,
//                 },
//             });
//             setOrders(data.orders);
//         } catch (error) {
//             console.log(error);
//             alert('Failed to fetch orders. Please try again later.');
//         }
//     };

//     useEffect(() => {
//         if (auth?.token) getOrders();
//     }, [auth?.token]);

//     const handleChange = async (orderId, value) => {
//         try {
//             const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/order-status/${orderId}`, { status: value })
//             getOrders();
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <Layout>
//             <div className="row">
//                 <div className="col-md-3">
//                     <AdminMenu />
//                 </div>
//                 <div className="col-md-9">
//                     <h1 className="text-center"> All Orders</h1>
//                     {orders?.map((o, i) => {
//                         return (
//                             <div className="bordershadow" key={o._id}>
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th scope="col">#</th>
//                                             <th scope="col">Status</th>
//                                             <th scope="col">Buyer</th>
//                                             <th scope="col">Date</th>
//                                             <th scope="col">Payment</th>
//                                             <th scope="col">Quantity</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>{i + 1}</td>  {/* ✅ <td> का सही उपयोग */}
//                                             <td>
//                                                 <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
//                                                     {status.map((s, i) => (
//                                                         <Option key={i} value={s}>{s}</Option>
//                                                     ))}
//                                                 </Select>
//                                             </td>
//                                             <td>{o?.buyer?.name}</td>
//                                             <td>{moment(o?.createdAt).fromNow()}</td>  {/* ✅ Corrected `createdAt` */}
//                                             <td>{o?.payment?.success ? "Success" : "Failed"}</td>  {/* ✅ Safe Payment Check */}
//                                             <td>{o?.products?.length}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                                 <div className="container">
//                                     {
//                                         o.products?.map((p, i) => (
//                                             <div className="row mb-2 card flex-row" key={p._id}>
//                                                 <div className="col-md-3">
//                                                     <img
//                                                         src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
//                                                         className="card-img-top img-fluid"
//                                                         alt={p.name}
//                                                         width="100px"
//                                                         height="100px"
//                                                     />
//                                                 </div>
//                                                 <div className="col-md-9 pb-2">
//                                                     <p>{p.name}</p>
//                                                     <p>{p.description.substring(0, 30)}</p>
//                                                     <p>Price: ${p.totalPrice}</p>
//                                                     <p>Quantity: {p.quantity}</p>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default AdminOrders
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
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
                    {orders.length === 0 ? (
                        <p className="text-center">No orders found</p>
                    ) : (
                        orders.map((order, index) => (
                            <div className="bordershadow mb-4 p-3" key={order._id}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Status</th>
                                            <th>Buyer</th>
                                            <th>Date</th>
                                            <th>Payment</th>
                                            <th>Quantity</th>
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

                                {/* ऑर्डर के प्रोडक्ट्स */}
                                <div className="container">
                                    {order.products?.map((product) => (
                                        <div className="row mb-2 card flex-row" key={product._id}>
                                            <div className="col-md-3">
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                                                    className="card-img-top img-fluid"
                                                    alt={product.name}
                                                    width="100px"
                                                    height="100px"
                                                />
                                            </div>
                                            <div className="col-md-9 pb-2">
                                                <p><strong>{product.name}</strong></p>
                                                <p>{product.description.substring(0, 30)}...</p>
                                                <p>Price: ${product.price}</p>
                                                <p>Quantity: {product.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;
