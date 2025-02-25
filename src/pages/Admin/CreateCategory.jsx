import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../Redux/Slices/authSlices";

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        dispatch(loadUser());
        getAllCategory();
    }, [dispatch]);

    // Handle form submission for creating category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("User is not authorized");
            return;
        }
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/category/create-category`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data?.success) {
                toast.success(`${data.category.name} is created`);
                getAllCategory();
                setName(""); // Reset input field
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong in input form");
        }
    };

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data.success) {
                setCategories(data.categories);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Something went wrong in getting category");
        }
    };

    // Open Modal for Edit
    const openEditModal = (category) => {
        setSelectedCategory(category);
        setUpdatedName(category.name);
        const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
        modal.show();
    };

    // Handle update category
    const handleUpdate = async () => {
        if (!token || !selectedCategory) {
            toast.error("User is not authorized");
            return;
        }
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/category/update-category/${selectedCategory._id}`,
                { name: updatedName }, // Correct way to send updatedName
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data.success) {
                toast.success(`${updatedName} updated successfully`);
                getAllCategory();
                setUpdatedName(""); // Reset updatedName field
                setSelectedCategory(null);
                document.getElementById("closeModal").click(); // Close modal
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Something went wrong while updating category");
        }
    };

    // Handle delete category
    const handleDelete = async (id) => {
        if (!token) {
            toast.error("User is not authorized");
            return;
        }
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/v1/category/delete-category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data.success) {
                toast.success("Category deleted successfully");
                getAllCategory(); // Refresh categories after deletion
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Something went wrong while deleting category");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Categories</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories?.map((c) => (
                                            <tr key={c._id}>
                                                <td>{c.name}</td>
                                                <td>
                                                    <button className="btn btn-warning mx-2" onClick={() => openEditModal(c)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No categories found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Edit Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={updatedName} // Bind updatedName here
                                onChange={(e) => setUpdatedName(e.target.value)}
                                placeholder="Enter category name"
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    );
};

export default CreateCategory;
