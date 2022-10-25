import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

type Props = {
    setUserInvalid: () => void;
}

const Logout = ({ setUserInvalid }: Props) => {
    AuthService.logout();
    setUserInvalid();

    return (
        <Navigate to='/login' />
    )
}

export default Logout