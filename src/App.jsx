import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Redux/Slices/authSlices";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import axios from "axios";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
// import BraintreePayment from "./pages/BraintreePayment";

  const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      // LocalStorage से Auth लोड करें
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        // console.log("Token from localStorage:", parsedAuth.token); // Debugging Token
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedAuth.token}`;
        dispatch(loadUser()); // Redux से यूज़र डेटा लोड करें
      }
    }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders/>} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/users" element={<User/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
