import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AuthStyle.css";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer
            });

            if (data.success) {
                toast.success("Password updated successfully! Please login.");
                navigate("/login"); // ✅ पासवर्ड अपडेट होते ही लॉगिन पेज पर जाएं
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "45vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="emailInput"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="securityAnswer"
                            placeholder="Enter your favorite sport name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="passwordInput"
                            placeholder="Enter your new password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
