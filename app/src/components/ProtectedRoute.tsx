import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    user: any;
    redirectPath?: string;
    children?: any;
}

const ProtectedRoute = ({ 
        user, 
        redirectPath = '/login',
        children
    }: Props) => {
        if(!user){
            return <Navigate to={redirectPath} replace />
        }
    return children ? children : <Outlet />
}

export default ProtectedRoute