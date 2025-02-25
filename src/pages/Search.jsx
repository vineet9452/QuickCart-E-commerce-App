import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSelector } from "react-redux"; // ✅ Redux state एक्सेस करने के लिए

const Search = () => {
    const { results } = useSelector((state) => state.search); // ✅ Redux state से डेटा लें

    return (
        <Layout>
            <div className="text-center">
                <h1> Search Results</h1>
                <h6>
                    {results.length === 0
                        ? "No Products Found"
                        : `Found ${results.length} Product(s)`}
                </h6>
                <div className="d-flex flex-wrap mt-4">
                    {
                        results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">${p.price}</p>
                                    <button className="btn btn-primary ms-1">More Details</button>
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

export default Search