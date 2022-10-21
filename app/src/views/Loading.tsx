import React from 'react'
import { CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <div className='spinner-wrapper'>
            <CircularProgress />
        </div>
    )
}

export default Loading