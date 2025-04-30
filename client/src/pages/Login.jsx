import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { LoginFormControls } from '../config/index.js';

const intialState={
    email:"",
    password:"",
}

const Login = () => {
    const [formData, setFormData] = useState(intialState);

    function onsubmit(event) {
        event.preventDefault();
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