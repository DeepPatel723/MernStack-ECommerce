import React, { useState } from 'react'
import { data, Link } from 'react-router-dom';
import Form from '../components/Form';
import { RegisterFormControls } from '../config/index.js';
import { useDispatch } from "react-redux";
import { registerUSer } from '../store/authSlice.js';


const intialState={
    username: "",
    email:"",
    password:"",
}

const Register = () => {
    const [formData, setFormData] = useState(intialState);
    const dispatch = useDispatch()

    function onsubmit(event) {
        event.preventDefault();

        dispatch(registerUser(formData)).then((data)=>{
            console.log(data);
        })
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