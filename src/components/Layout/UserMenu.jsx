import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
    return (
        <div className="text-center">
            <div className="list-group shadow-lg p-3 rounded">
                <h4 className="text-primary fw-bold mb-3">📌 User Dashboard</h4>
                <NavLink
                    to="/dashboard/user/profile"
                    className="list-group-item list-group-item-action list-group-item-light"
                >
                    🧑 Profile
                </NavLink>
                <NavLink
                    to="/dashboard/user/orders"
                    className="list-group-item list-group-item-action list-group-item-light"
                >
                    📦 Orders
                </NavLink>
            </div>
        </div>
    );
};

export default UserMenu;
