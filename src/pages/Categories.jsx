import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'


const Categories = () => {
    const categories = useCategory()
    return (
        <Layout>
            <div className="container mt-4">
                <h2 className="text-center mb-4">🛍 Explore Categories</h2>
                <div className="row">
                    {categories.map((c) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="text-decoration-none">
                                <div className="card category-card shadow-sm">
                                    <div className="card-body text-center">
                                        <h5 className="card-title fw-bold">{c.name}</h5>
                                        <p className="small text-muted">Discover amazing products</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories