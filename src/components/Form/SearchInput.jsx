import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchKeyword, setSearchResults } from "../../Redux/Slices/searchSlices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // Search आइकन

const SearchInput = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        dispatch(setSearchKeyword(input));

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/search/${input}`);
            dispatch(setSearchResults(data));

            if (data.length > 0) {
                navigate("/search");
            }
        } catch (error) {
            console.error("Search API Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-2">
            <form
                className="d-flex align-items-center shadow-sm p-2 rounded bg-white"
                style={{ width: "320px", border: "2px solid #007bff" }}
                onSubmit={handleSearch}
            >
                <input
                    className="form-control me-2 border-0 fs-6"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ borderRadius: "8px", outline: "none", padding: "8px" }}
                />
                <button
                    className="btn btn-primary d-flex align-items-center"
                    type="submit"
                    style={{ borderRadius: "8px", padding: "8px 12px" }}
                >
                    <FiSearch size={18} /> {/* 🔍 Search Icon */}
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
