// import { createSlice } from "@reduxjs/toolkit";

// // 🔹 LocalStorage से डेटा लोड करें
// const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

// const initialState = {
//     items: storedCart,
//     totalAmount: storedCart.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const existingItem = state.items.find(item => item._id === action.payload._id);

//             if (existingItem) {
//                 existingItem.quantity += 1; // 🔹 Quantity बढ़ाएँ
//             } else {
//                 state.items.push({ ...action.payload, quantity: 1 }); // 🔹 नया आइटम जोड़ें
//             }

//             state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

//             // 🔹 LocalStorage अपडेट करें
//             localStorage.setItem("cart", JSON.stringify(state.items));
//         },

//         removeFromCart: (state, action) => {
//             const existingItem = state.items.find(item => item._id === action.payload);

//             if (existingItem && existingItem.quantity > 1) {
//                 existingItem.quantity -= 1; // 🔹 Quantity घटाएँ
//             } else {
//                 state.items = state.items.filter((item) => item._id !== action.payload); // 🔹 पूरी तरह हटाएँ
//             }

//             state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

//             // 🔹 LocalStorage अपडेट करें
//             localStorage.setItem("cart", JSON.stringify(state.items));
//         },

//         clearCart: (state) => {
//             state.items = [];
//             state.totalAmount = 0;

//             // 🔹 LocalStorage क्लियर करें
//             localStorage.removeItem("cart");
//         },
//     },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

// 🔹 LocalStorage से डेटा लोड करें
const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
    items: storedCart,
    totalAmount: storedCart.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);

            if (existingItem) {
                existingItem.quantity += 1; // 🔹 Quantity बढ़ाएँ
                existingItem.totalPrice = existingItem.quantity * existingItem.price; // 🔹 Price Update करें
            } else {
                state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price }); // 🔹 नया आइटम जोड़ें
            }

            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

            // 🔹 LocalStorage अपडेट करें
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // 🔹 Quantity घटाएँ
                existingItem.totalPrice = existingItem.quantity * existingItem.price; // 🔹 Price Update करें
            } else {
                state.items = state.items.filter((item) => item._id !== action.payload); // 🔹 पूरी तरह हटाएँ
            }

            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

            // 🔹 LocalStorage अपडेट करें
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;

            // 🔹 LocalStorage क्लियर करें
            localStorage.removeItem("cart");
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
