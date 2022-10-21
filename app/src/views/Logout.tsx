import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

const Logout = () => {
    useEffect(() => {
        AuthService.logout();
    },[])

    return (
        <Navigate to='/login' />
    )
}

export default Logout