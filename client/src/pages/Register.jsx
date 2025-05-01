import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { RegisterFormControls } from '../config/index.js';
import { useDispatch } from "react-redux";
import { registerUser } from '../store/authSlice.js';
import { toast } from "react-hot-toast";


const intialState={
    name: "",
    email:"",
    password:"",
}

const Register = () => {
    const [formData, setFormData] = useState(intialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onsubmit(event) {
        event.preventDefault();
        // console.log(formData);

        dispatch(registerUser(formData)).then((data)=>{
            // console.log(data);
            if (data?.payload?.success) {
                toast.success(data?.payload?.message || 'Registration successful!');
                navigate("/auth/login");
            } else {
                toast.error(data?.payload?.message || 'An errror occurred!');
            }
        })
        .catch((error) => {
            console.error('Registration failed:', error);
          });
        
    }
  return (
    <div className="customer register-container">
        <div className="sec-head">
            <h2 className="sec-title">Sign Up to your account</h2>
            <p className="sec-text">Don't have an account, <Link className='link-label' to={'/auth/login'}>Login</Link></p>
        </div>
        <Form
        formControls={RegisterFormControls}
        buttonText={"Sign UP"}
        formData={formData}
        setFormData={setFormData}
        onsubmit={onsubmit}/>
    </div>
  )
}

export default Register;