

import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminPrivate() {
    const { token, user } = useSelector((state) => state.auth); // token and user data from Redux store
    const location = useLocation();

    // If no token or user is not admin
    if (!token || user?.role !== 1) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return token ? <Outlet /> : <Spinner path=""/>;
}
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Spinner from "../Spinner";

// export default function AdminPrivate() {
//     const { token, user, loading } = useSelector((state) => state.auth); // Redux store से auth डेटा लें
//     const location = useLocation();

//     // अगर डेटा लोड हो रहा है, तो स्पिनर दिखाएँ
//     if (loading) return <Spinner path="" />;

//     // अगर टोकन नहीं है या यूज़र एडमिन नहीं है, तो लॉगिन पेज पर भेजें
//     if (!token || user?.role !== 1) {
//         return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//     }

//     // अगर यूज़र सही एडमिन है, तो आउटलेट रेंडर करें
//     return <Outlet />;
// }


// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Spinner from "../Spinner";

// export default function AdminPrivate() {
//     const { token, user } = useSelector((state) => state.auth);
//     const location = useLocation();

//     console.log("Checking Auth in Private Route:", { token, user });

//     if (!token || user?.role !== 1) {
//         return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//     }

//     return <Outlet />;
// }
