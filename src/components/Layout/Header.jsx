import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slices/authSlices";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const dispatch = useDispatch();
  const categories = useCategory();
  const cart = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.auth);

  // लॉगआउट फ़ंक्शन
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">
        {/* ब्रांड लोगो */}
        <Link to="/" className="navbar-brand fw-bold text-light">
          🛍️ ECOMMERCE
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <SearchInput />
            </li>

            <li className="nav-item">
              <NavLink to="/" className="nav-link text-light">
                Home
              </NavLink>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* लॉगिन / रजिस्टर या यूज़र प्रोफाइल */}
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link text-light">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link text-light">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown">
                  <UserOutlined className="me-1" /> {auth.user.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <LogoutOutlined className="me-1" /> Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* Cart */}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link text-light">
                <Badge count={cart?.length} showZero offset={[10, -5]}>
                  <ShoppingCartOutlined className="fs-5 text-warning" />
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
