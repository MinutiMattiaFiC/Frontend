import React from 'react'
import {Navigate} from "react-router-dom"

interface IProtectedRouteProps {
    children: any;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children}) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return <Navigate to={"/auth/login"} replace/>
    }
    return children;

};

export default ProtectedRoute;