import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({isAuthenticted, user, children}) => {
    const loction = useLocation();
    if (!isAuthenticted) {
        return <Navigate to={'/auth/login'}/>
    }

    if (isAuthenticted && (loction.pathname.includes("/login") || loction.pathname.includes("/register"))) {
        if (user?.role === "admin") {
            return <Navigate to={'/admin/dashboard'}/>
        } else {
            return <Navigate to={'/'}/>
        }
    }

    if (isAuthenticted && user?.role !== "admim" && loction.pathname.includes("admin")) {
        <Navigate to={'404'}/>
    }
    
  return (
   <>{children}</>
  )
}

export default CheckAuth;