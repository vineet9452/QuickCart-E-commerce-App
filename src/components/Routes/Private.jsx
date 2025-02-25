// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";
// import Spinner from "../Spinner";

// export default function Private(){
//     const [ok,setOk] = useState(false)
//     const auth = useSelector((state) => state.auth);
//     console.log(auth.user); // अगर यूजर लॉग इन है तो यूज़र की जानकारी मिलेगी

//     useEffect(()=>{
//         const authCheck=async()=>{
//             const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`);
//             if (res.data.ok) {
//                 setOk(true)
//             } else{
//                 setOk(false)
//             }
//         };
//         if(auth?.token) authCheck()
//     },[auth?.token]);
  

//     return ok ? <Outlet/> :<Spinner/>

// }


// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import Spinner from "../Spinner";

// export default function Private() {
//     const { token } = useSelector((state) => state.auth);

//     if (token === null) {
//         return <Spinner />;  // जब तक Redux से डेटा लोड नहीं होता, Spinner दिखाएं
//     }

//     return token ? <Outlet /> : <Navigate to="/login" replace />;
// }

import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../Spinner";

export default function Private() {
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();

    if (token === null) {
        return <Spinner />;
    }

    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Spinner from "../Spinner";
// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function Private() {
//     const { token } = useSelector((state) => state.auth);
//     const location = useLocation();
//     const [ok, setOk] = useState(null); // `null` to indicate the initial loading state

//     // This effect checks if the token is valid by making an API call
//     useEffect(() => {
//         const authCheck = async () => {
//             try {
//                 const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`, {
//                     headers: {
//                         Authorization: `Bearer ${token}` // Include token in headers
//                     }
//                 });
//                 if (res.data.ok) {
//                     setOk(true); // Token is valid
//                 } else {
//                     setOk(false); // Invalid token
//                 }
//             } catch (error) {
//                 setOk(false); // If the API call fails, consider the token invalid
//             }
//         };

//         if (token) {
//             authCheck(); // Make the API call if token exists
//         } else {
//             setOk(false); // No token found, redirect to login
//         }
//     }, [token]);

//     if (ok === null) {
//         return <Spinner />; // Wait until we get the response from the API
//     }

//     // If the user is authenticated and has a valid token
//     if (ok) {
//         return <Outlet />;
//     } else {
//         return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//     }
// }
