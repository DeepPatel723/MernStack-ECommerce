import React, { useState } from 'react'
import { data, Link } from 'react-router-dom';
import Form from '../components/Form';
import { LoginFormControls } from '../config/index.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice.js';
import { toast } from "react-hot-toast";

const intialState={
    email:"",
    password:"",
}

const Login = () => {
    const [formData, setFormData] = useState(intialState);
    const dispatch = useDispatch();

    function onsubmit(event) {
        event.preventDefault();
        console.log(formData);  

        dispatch(loginUser(formData)).then((data)=>{
            console.log(data);
            if (data?.payload?.success) {
                toast.success(data?.payload?.message || 'Login successful!');
            } else {
                toast.error(data?.payload?.message || 'An errror occurred!');
            }
        })
    }
  return (
    <div className="customer login-container">
        <div className="sec-head">
            <h2 className="sec-title">Sign in to your account</h2>
            <p className="sec-text">Don't have an account, <Link className='link-label' to={'/auth/register'}>Register</Link></p>
        </div>
        <Form
        formControls={LoginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onsubmit={onsubmit}/>
    </div>
  )
}

export default Login;