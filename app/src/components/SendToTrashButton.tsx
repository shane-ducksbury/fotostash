import { IconButton, Tooltip } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { IoTrashBin } from 'react-icons/io5';
import Image from '../interfaces/Image';

type Props = {
    images: Image[] | null;
    handleForceParentRerender?: () => void;
    clearSelectionCallback?: () => void;
    iconSize?: number;
    color: string;
}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const SendToTrashButton = ({ images, handleForceParentRerender, color }: Props) => {

    const handleTrashImage = () => {
        images?.forEach(image => {
            axios.patch(
                API_URL + '/images/' + image.id,
                {"deleted": true}
                )
        })
        // handleForceParentRerender();
    }

    return (
        <Tooltip title='Send to Trash'>
            <IconButton onClick={handleTrashImage}><IoTrashBin color={color} /></IconButton>
        </Tooltip>
    )
}

export default SendToTrashButton