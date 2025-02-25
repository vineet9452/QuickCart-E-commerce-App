{/* <p>{JSON.stringify(orders, null, 4)}</p> */ }

import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment'
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/orders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch orders. Please try again later.');
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row">
          {/* 🏠 Sidebar Menu */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* 📦 Orders List */}
          <div className="col-md-9">
            <h2 className="mb-4 text-primary">🛍️ All Orders</h2>

            {orders?.map((o, i) => (
              <div className="card shadow-sm mb-4 p-3" key={o._id}>
                {/* 📌 Orders Table */}
                <table className="table table-bordered text-center">
                  <thead className="table-primary">
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
                      <td>{i + 1}</td>
                      <td>
                        <span
                          className={`badge ${o?.status === "Delivered" ? "bg-success" : "bg-warning"
                            }`}
                        >
                          {o?.status}
                        </span>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>
                        <span
                          className={`badge ${o?.payment?.success ? "bg-success" : "bg-danger"
                            }`}
                        >
                          {o?.payment?.success ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                {/* 📦 Products in Order */}
                <div className="container">
                  {o.products?.map((p, i) => (
                    <div className="row mb-3 border rounded p-2 bg-light" key={p._id}>
                      <div className="col-md-3 d-flex align-items-center">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                          className="img-fluid rounded shadow-sm"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-9">
                        <h5 className="text-primary">{p.name}</h5>
                        <p className="text-muted">{p.description.substring(0, 50)}...</p>
                        <p>
                          <strong>💰 Price:</strong> ${p.price}
                        </p>
                        <p>
                          <strong>📦 Quantity:</strong> {p.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
