import { Button } from '@mui/material'
import axios from 'axios';
import React from 'react'

type Props = {
    imageId: string;
    handleForceParentRerender: () => void;
}

const API_ENDPOINT = "http://localhost:5050"

const SendToTrashButton = ({ imageId, handleForceParentRerender }: Props) => {

    const handleTrashImage = () => {
        axios.patch(
            API_ENDPOINT + '/images/' + imageId,
            {"deleted": true}
            )
        
        handleForceParentRerender();
    }

    return (
        <Button color="error" onClick={handleTrashImage}>Trash</Button>
    )
}

export default SendToTrashButton