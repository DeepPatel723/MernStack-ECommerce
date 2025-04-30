import React from 'react'
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="customer-container">
        <div>Auth</div>
        <div className="customer-form-container">
            <Outlet />  
        </div>
    </div>
    )
}

export default Auth;