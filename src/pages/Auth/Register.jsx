import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast  from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AuthStyle.css";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer, setAnswer] = useState("");


    const navigate = useNavigate();

    //form function
    const handleSubmit=async(e)=>{
        e.preventDefault();
    const userData = { name, email, password, phone, address,answer };
    console.log("Sending Data:", userData);  
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`,userData)
       try {
           if (res.data.success) {
               toast.success(res.data.message);
               navigate('/login')
           } else {
               toast.error(res.data.message)
           }
       } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
       }
    }


    return (
        <Layout>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" id="exampleInputEmail1" placeholder='Enter your name' required />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" placeholder='Enter your email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder='Enter your password' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="exampleInputEmail1" placeholder='Enter your phone' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control" id="exampleInputEmail1" placeholder='Enter your address' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} className="form-control" id="exampleInputEmail1" placeholder='Enter your favorite Sport Name' required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register