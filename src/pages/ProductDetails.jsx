import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slices/cartSlices";
// import { toast } from 'react-toastify';
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while fetching product details!");
        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products || []);
        } catch (error) {
            console.log("Error fetching related products:", error);
            toast.error("Failed to fetch related products!");
        }
    };

    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300"
                        width="350px"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: ${product.price}</h6>
                    <h6>Category: {product.category?.name || "No Category"}</h6>
                    <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                            dispatch(addToCart(product));
                            toast.success("Item Added to Cart");
                        }}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            <div className="row container">
                <h5>Similar products</h5>
                {relatedProducts.length < 1 && <p className='text-center'>No Similar Products found</p>}
                <div className="d-flex flex-wrap">
                    {
                        relatedProducts?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">${p.price}</p>
                                    <button
                                        className="btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-secondary ms-1"
                                        onClick={() => {
                                            dispatch(addToCart(p));
                                            toast.success("Item Added to Cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
