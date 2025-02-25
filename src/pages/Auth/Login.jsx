import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AuthStyle.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Import dispatch hook
import { login } from '../../Redux/Slices/authSlices'; // Import login action

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch(); // Initialize dispatch
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            console.log("🔄 Sending Login Request...");
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, userData);

            console.log("✅ Login API Response:", res.data);

            if (res.data.success) {
                dispatch(login({ user: res.data.user, token: res.data.token }));
                toast.success(res.data.message);

                // ✅ लॉगिन के बाद सही पेज पर रीडायरेक्ट करो
                const redirectPath = location.state?.from || "/";
                console.log(`🚀 Redirecting to: ${redirectPath}`);
                navigate(redirectPath);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("❌ Login API Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };




    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container " style={{ minHeight: "45vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn forgot-btn"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                        >
                            Forgot Password
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                </form>
            </div>
        </Layout>

    );
};

export default Login;
