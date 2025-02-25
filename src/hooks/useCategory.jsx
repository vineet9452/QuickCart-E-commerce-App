import { useState, useEffect } from "react"
import axios from "axios";

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    //get cat
    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
            // console.log(data.categories)
            setCategories(data?.categories)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory();
    }, [])

    return categories;
}

export default useCategory