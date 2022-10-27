import { Button, IconButton, Snackbar } from '@mui/material'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Navigate } from 'react-router-dom'

type Props = {}

const SessionTimeout = (props: Props) => {
    return (
        <>
            <Navigate to='/logout' />
        </>
    )
}

export default SessionTimeout