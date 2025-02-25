import React from "react";
import { NavLink } from "react-router-dom";
import { FiList, FiBox, FiShoppingBag, FiClipboard } from "react-icons/fi"; // आइकॉन इम्पोर्ट करें

const AdminMenu = () => {
    return (
        <div className="text-center mt-4">
            <div className="list-group shadow p-3 bg-white rounded" style={{ maxWidth: "280px", margin: "auto", border: "2px solid #007bff" }}>
                <h4 className="text-primary fw-bold">⚙️ Admin Panel</h4>

                <NavLink
                    to="/dashboard/admin/create-category"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ transition: "0.3s" }}
                >
                    <FiList className="me-2" /> Create Category
                </NavLink>

                <NavLink
                    to="/dashboard/admin/create-product"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ transition: "0.3s" }}
                >
                    <FiBox className="me-2" /> Create Product
                </NavLink>

                <NavLink
                    to="/dashboard/admin/products"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ transition: "0.3s" }}
                >
                    <FiShoppingBag className="me-2" /> Products
                </NavLink>

                <NavLink
                    to="/dashboard/admin/orders"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ transition: "0.3s" }}
                >
                    <FiClipboard className="me-2" /> Orders
                </NavLink>
            </div>
        </div>
    );
};

export default AdminMenu;
