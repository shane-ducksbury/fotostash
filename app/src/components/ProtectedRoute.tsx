import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    user: any;
    redirectPath?: string;
    children?: any;
    authChecked: boolean;
}

const ProtectedRoute = ({ 
        user, 
        redirectPath = '/login',
        children,
        authChecked
    }: Props) => {
        if(!authChecked){
            return(<p>Page Loading</p>)
        }
        if(!user){
            return <Navigate to={redirectPath} replace />
        }
    return children ? children : <Outlet />
}

export default ProtectedRoute