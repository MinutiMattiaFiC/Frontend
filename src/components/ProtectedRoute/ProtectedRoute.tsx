import React from 'react'
import {Navigate} from "react-router-dom"
import useToken from "../hooks/useToken";

interface IProtectedRouteProps {
    children: any;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children}) => {
    const token = useToken();
    if (!token) {
        return <Navigate to={"/auth/login"} replace/>
    }
    return children;

};

export default ProtectedRoute;