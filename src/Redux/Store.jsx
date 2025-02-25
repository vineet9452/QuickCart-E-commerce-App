import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadUser } from './Slices/authSlices';  // ✅ loadUser इंपोर्ट करें
import cartReducer from './Slices/cartSlices';
import searchReducer from './Slices/searchSlices';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        search: searchReducer,
    },
});

// ✅ Store लोड होते ही `loadUser()` चलाएँ ताकि लॉगिन स्टेट में बना रहे
store.dispatch(loadUser());

export default store;
