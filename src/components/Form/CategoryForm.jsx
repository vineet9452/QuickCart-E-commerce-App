import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <form
                onSubmit={handleSubmit}
                className="p-4 shadow rounded bg-white"
                style={{ width: "400px", border: "2px solid #007bff" }}
            >
                <h4 className="text-center mb-3 text-primary fw-bold">
                    📂 Add New Category
                </h4>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control p-2 fs-5 border-primary"
                        placeholder="Enter category name..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{ borderRadius: "10px" }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                    style={{
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "18px",
                        transition: "0.3s",
                    }}
                >
                    ✅ Submit
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
