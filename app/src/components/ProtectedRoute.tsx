import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../views/Loading';

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
            return(<Loading />)
        }
        if(!user){
            return <Navigate to={redirectPath} replace />
        }
    return children ? children : <Outlet />
}

export default ProtectedRoute