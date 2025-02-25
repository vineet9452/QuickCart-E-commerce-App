import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCount((prevCount) => {
    //             if (prevCount === 1) {
    //                 // navigate को useEffect के बाद कॉल करें
    //                 navigate("/login", { state: { from: location.pathname } });
    //             }
    //             return prevCount - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(interval); // Cleanup interval on unmount
    // }, [navigate, location]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        count === 0 && navigate(`/${path}`, { state: { from: location.pathname } });

        return () => clearInterval(interval);
    }, [count, navigate, location,path]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className="text-center">Redirecting to you in {count} second</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
