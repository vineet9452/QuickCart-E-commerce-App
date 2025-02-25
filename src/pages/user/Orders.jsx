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
      <div className="container-fluid p-2">
        <div className="row">
          {/* 🏠 Sidebar Menu */}
          <div className="col-12 col-md-3 mb-3">
            <UserMenu />
          </div>

          {/* 📦 Orders List */}
          <div className="col-12 col-md-9">
            <h2 className="mb-3 text-primary text-center">🛍️ All Orders</h2>

            {orders?.map((o, i) => (
              <div className="card shadow-sm mb-4 p-2 border-0" key={o._id}>
                {/* 📌 Desktop View: Table */}
                <div className="d-none d-md-block">
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered text-center">
                      <thead className="table-primary small-text">
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
                          <td>{i + 1}</td>
                          <td>
                            <span className={`badge ${o?.status === "Delivered" ? "bg-success" : "bg-warning"}`}>
                              {o?.status}
                            </span>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>
                            <span className={`badge ${o?.payment?.success ? "bg-success" : "bg-danger"}`}>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </span>
                          </td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 📱 Mobile View: Card Format */}
                <div className="d-block d-md-none p-3 border rounded bg-light">
                  <p><strong>#</strong> {i + 1}</p>
                  <p>
                    <strong>Status:</strong>
                    <span className={`badge ${o?.status === "Delivered" ? "bg-success" : "bg-warning"}`}>
                      {o?.status}
                    </span>
                  </p>
                  <p><strong>Buyer:</strong> {o?.buyer?.name}</p>
                  <p><strong>Date:</strong> {moment(o?.createdAt).fromNow()}</p>
                  <p>
                    <strong>Payment:</strong>
                    <span className={`badge ${o?.payment?.success ? "bg-success" : "bg-danger"}`}>
                      {o?.payment?.success ? "Success" : "Failed"}
                    </span>
                  </p>
                  <p><strong>Quantity:</strong> {o?.products?.length}</p>
                </div>

                {/* 📦 Ordered Products (Responsive Grid Format) */}
                <div className="container">
                  <div className="row">
                    {o.products?.map((p) => (
                      <div className="col-6 col-md-4 col-lg-3 mb-3" key={p._id}>
                        <div className="card p-2 shadow-sm h-100">
                          {/* 📸 Product Image */}
                          <div className="text-center">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                              className="img-fluid rounded product-img"
                              alt={p.name}
                              style={{ maxWidth: "80px", height: "auto" }}
                            />
                          </div>

                          {/* 📝 Product Details */}
                          <div className="text-center mt-2">
                            <h6 className="text-primary m-0">{p.name}</h6>
                            <p className="text-muted m-0 small-text">{p.description.substring(0, 30)}...</p>
                            <p className="m-0"><strong>💰 Price:</strong> ${p.price}</p>
                            <p className="m-0"><strong>📦 Qty:</strong> {p.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
