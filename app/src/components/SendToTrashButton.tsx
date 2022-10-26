import { IconButton, Tooltip } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { IoTrashBin } from 'react-icons/io5';

type Props = {
    imageId: string | null;
    handleForceParentRerender: () => void;
    iconSize?: number;
}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const SendToTrashButton = ({ imageId, handleForceParentRerender }: Props) => {

    

    const handleTrashImage = () => {
        axios.patch(
            API_URL + '/images/' + imageId,
            {"deleted": true}
            )
        
        handleForceParentRerender();
    }

    return (
        <Tooltip title='Delete'>
            <IconButton onClick={handleTrashImage}><IoTrashBin color="#FFFFFF"/></IconButton>
        </Tooltip>
    )
}

export default SendToTrashButton