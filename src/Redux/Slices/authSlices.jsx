// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     user: null,
//     token: null,
//     role: null,  // ✅ Role स्टोर करने के लिए नया key
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             state.user = action.payload.user;
//             state.token = action.payload.token;
//             state.role = action.payload.user.role;

//             // LocalStorage में डेटा स्टोर करें
//             localStorage.setItem('auth', JSON.stringify(action.payload));

//             // Axios Header Set करें
//             axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
//         },
//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             state.role = null;

//             // LocalStorage से डेटा हटाएं
//             localStorage.removeItem('auth');
//             delete axios.defaults.headers.common['Authorization'];
//         },
//         loadUser: (state) => {
//             const storedAuth = localStorage.getItem('auth');
//             if (storedAuth) {
//                 const parsedAuth = JSON.parse(storedAuth);
//                 state.user = parsedAuth.user;
//                 state.token = parsedAuth.token;
//                 state.role = parsedAuth.user?.role || "user"; // Default role: user

//                 // Axios Header Set करें
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${parsedAuth.token}`;
//             }
//         },
//     },
// });

// export const { login, logout, loadUser } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    token: null,
    role: null,  // ✅ Role स्टोर करने के लिए नया key
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role || "user";

            // ✅ LocalStorage में स्टोर करें
            localStorage.setItem('auth', JSON.stringify(action.payload));

            // ✅ Redux Store में तुरंत अपडेट करें
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;

            // ✅ LocalStorage से डेटा हटाएं
            localStorage.removeItem('auth');

            // ✅ Axios Header Remove करें
            delete axios.defaults.headers.common['Authorization'];
        },
        loadUser: (state) => {
            const storedAuth = localStorage.getItem('auth');
            if (storedAuth) {
                const parsedAuth = JSON.parse(storedAuth);
                state.user = parsedAuth.user;
                state.token = parsedAuth.token;
                state.role = parsedAuth.user?.role || "user"; // Default role: user

                // ✅ Axios Header Set करें
                axios.defaults.headers.common['Authorization'] = `Bearer ${parsedAuth.token}`;
            }
        },
    },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
