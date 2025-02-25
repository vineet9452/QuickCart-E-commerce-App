import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slices/cartSlices";
import toast from "react-hot-toast";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.items);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
            );
            setCategories(data.success ? data.categories : []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`
            );
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        checked.length > 0 || radio.length > 0 ? filterProduct() : getAllProducts();
    }, [checked, radio]);

    const getTotal = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/product-count`
            );
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`
            );
            setProducts([...products, ...data?.products]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleFilter = (value, id) => {
        let all = [...checked];
        value ? all.push(id) : (all = all.filter((c) => c !== id));
        setChecked(all);
    };

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`,
                { checked, radio }
            );
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        // <Layout>
        //     <div className="container-fluid mt-4">
        //         <div className="row">
        //             {/* ===== Sidebar Filters ===== */}
        //             <div className="col-lg-2 col-md-3 sidebar">
        //                 <h4 className="filter-title">Filter By Category</h4>
        //                 <div className="d-flex flex-column">
        //                     {categories?.map((c) => (
        //                         <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
        //                             {c.name}
        //                         </Checkbox>
        //                     ))}
        //                 </div>

        //                 <h4 className="filter-title mt-4">Filter By Price</h4>
        //                 <div className="d-flex flex-column">
        //                     <Radio.Group onChange={(e) => setRadio(e.target.value)}>
        //                         {Prices?.map((p) => (
        //                             <div key={p._id}>
        //                                 <Radio value={p.array}>{p.name}</Radio>
        //                             </div>
        //                         ))}
        //                     </Radio.Group>
        //                 </div>

        //                 <button className="btn btn-danger mt-3 w-100" onClick={() => window.location.reload()}>
        //                     RESET FILTERS
        //                 </button>
        //             </div>

        //             {/* ===== Product Grid ===== */}
        //             <div className="col-lg-10 col-md-9">
        //                 <h1 className="text-center product-header">All Products</h1>
        //                 <div className="product-grid">
        //                     {products.map((p) => (
        //                         <div className="product-card" key={p._id}>
        //                             <img
        //                                 src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
        //                                 alt={p.name}
        //                                 className="product-img"
        //                             />
        //                             <div className="product-details">
        //                                 <h5 className="product-title">{p.name}</h5>
        //                                 <p className="product-description">{p.description.substring(0, 50)}...</p>
        //                                 <p className="product-price">${p.price}</p>
        //                                 <div className="button-group">
        //                                     <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>
        //                                         More Details
        //                                     </button>
        //                                     <button
        //                                         className="btn btn-secondary"
        //                                         onClick={() => {
        //                                             dispatch(addToCart(p));
        //                                             toast.success("Item Added to Cart");
        //                                         }}
        //                                     >
        //                                         ADD TO CART
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>

        //                 {/* ===== Load More Button ===== */}
        //                 <div className="text-center mt-4">
        //                     {products && products.length < total && (
        //                         <button className="btn btn-warning" onClick={(e) => {
        //                             e.preventDefault();
        //                             setPage(page + 1);
        //                         }}>
        //                             {loading ? "Loading..." : "Load more"}
        //                         </button>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Layout>

        // <Layout>
        //     <div className="container-fluid mt-4">
        //         <div className="row">
        //             {/* ===== Sidebar Filters ===== */}
        //             <div className="col-lg-2 col-md-3 sidebar">
        //                 <h4 className="filter-title">Filter By Category</h4>
        //                 <div className="d-flex flex-column">
        //                     {categories?.map((c) => (
        //                         <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
        //                             {c.name}
        //                         </Checkbox>
        //                     ))}
        //                 </div>

        //                 <h4 className="filter-title mt-4">Filter By Price</h4>
        //                 <div className="d-flex flex-column">
        //                     <Radio.Group onChange={(e) => setRadio(e.target.value)}>
        //                         {Prices?.map((p) => (
        //                             <div key={p._id}>
        //                                 <Radio value={p.array}>{p.name}</Radio>
        //                             </div>
        //                         ))}
        //                     </Radio.Group>
        //                 </div>

        //                 <button className="btn btn-danger mt-3 w-100" onClick={() => window.location.reload()}>
        //                     RESET FILTERS
        //                 </button>
        //             </div>

        //             {/* ===== Product Grid ===== */}
        //             <div className="col-lg-10 col-md-9">
        //                 <h1 className="text-center product-header">All Products</h1>
        //                 <div className="row">
        //                     {products.map((p) => (
        //                         <div className="col-lg-4 col-md-6 mb-4" key={p._id}>
        //                             <div className="card h-100 shadow-sm">
        //                                 <img
        //                                     src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
        //                                     alt={p.name}
        //                                     className="card-img-top"
        //                                     style={{ height: "200px", objectFit: "cover" }}
        //                                 />
        //                                 <div className="card-body d-flex flex-column">
        //                                     <h5 className="card-title">{p.name}</h5>
        //                                     <p className="card-text">{p.description.substring(0, 50)}...</p>

        //                                     {/* ✅ Price & Quantity Row */}
        //                                     <div className="d-flex justify-content-between align-items-center p-2 border-top bg-light rounded">
        //                                         <span className="text-success fw-bold">💰 ${p.price}</span>
        //                                         <span className="text-danger fw-bold">📦 {p.quantity || "N/A"} in stock</span>
        //                                     </div>

        //                                     {/* ✅ Button Group */}
        //                                     <div className="mt-3 d-flex justify-content-between">
        //                                         <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>
        //                                             More Details
        //                                         </button>
        //                                         <button
        //                                             className="btn btn-secondary"
        //                                             onClick={() => {
        //                                                 dispatch(addToCart(p));
        //                                                 toast.success("Item Added to Cart");
        //                                             }}
        //                                         >
        //                                             ADD TO CART
        //                                         </button>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>

        //                 {/* ===== Load More Button ===== */}
        //                 <div className="text-center mt-4">
        //                     {products && products.length < total && (
        //                         <button className="btn btn-warning" onClick={(e) => {
        //                             e.preventDefault();
        //                             setPage(page + 1);
        //                         }}>
        //                             {loading ? "Loading..." : "Load more"}
        //                         </button>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Layout>
        <Layout>
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* ===== Sidebar Filters ===== */}
                    <div className="col-lg-2 col-md-3 sidebar">
                        <h4 className="filter-title">Filter By Category</h4>
                        <div className="d-flex flex-column">
                            {categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>

                        <h4 className="filter-title mt-4">Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>

                        <button className="btn btn-danger mt-3 w-100" onClick={() => window.location.reload()}>
                            RESET FILTERS
                        </button>
                    </div>

                    {/* ===== Product Grid ===== */}
                    <div className="col-lg-10 col-md-9">
                        <h1 className="text-center product-header">All Products</h1>
                        <div className="row">
                            {products.map((p) => (
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={p._id}>
                                    <div className="product-card card h-100 shadow-sm">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                                            alt={p.name}
                                            className="product-img card-img-top"
                                        />
                                        <div className="product-details card-body d-flex flex-column">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 50)}...</p>

                                            <div className="d-flex justify-content-between align-items-center p-2 border-top bg-light rounded">
                                                <span className="text-success fw-bold">💰 ${p.price}</span>
                                                <span className="text-danger fw-bold">📦 {p.quantity || "N/A"} in stock</span>
                                            </div>

                                            <div className="mt-3 d-flex justify-content-between">
                                                <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>
                                                    More Details
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                        dispatch(addToCart(p));
                                                        toast.success("Item Added to Cart");
                                                    }}
                                                >
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                        {/* ===== Load More Button ===== */}
                        <div className="text-center mt-4">
                            {products && products.length < total && (
                                <button className="btn btn-warning" onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                    {loading ? "Loading..." : "Load more"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default HomePage;
