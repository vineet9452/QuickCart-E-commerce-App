import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initial details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])


    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)

        } catch (error) {
            console.log(error);
        }
    };


    const getSimilarProduct = async (pid, cid) => {
        console.log("Fetching Related Products for:", pid, cid);

        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/related-product/${pid}/${cid}`
            );
            console.log("Related Products Response:", data.products);
            setRelatedProducts(data?.products || []);
        } catch (error) {
            console.log("Error fetching related products:", error);
        }
    };
    return (
        <Layout>

            <div className="row container mt-2">
                <div className="col-md-6">
                    <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={"300"} width={'350px'} />
                </div>
                <div className="col-md-6">
                    <h1 className=' text-center'>Product Details</h1>
                    <h6>Name:{product.name}</h6>
                    <h6>Description:{product.description}</h6>
                    <h6>Price:{product.price}</h6>
                    <h6>Category: {product.category?.name || "No Category"}</h6>
                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <div className="row container">
                <h5>Similar products</h5>
                {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products found</p>)}
                {/* {JSON.stringify(relatedProducts, null, 4)} */}
                <div className="d-flex flex-wrap">
                    {
                        relatedProducts?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">${p.price}</p>
                                    {/* <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button> */}
                                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails