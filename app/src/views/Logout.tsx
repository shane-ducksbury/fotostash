import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

type Props = {

}


const Logout = (props: Props) => {
    useEffect(() => {
        AuthService.logout();
    },[])

    return (
        <Navigate to='/login' />
    )
}

export default Logout