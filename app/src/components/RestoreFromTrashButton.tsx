import { IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { IoArrowUndoCircle } from 'react-icons/io5';
import Image from '../interfaces/Image';

type Props = {
    images: Image[] | null;
    color: string;
    clearSelectionCallback?: () => void;
}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const RestoreFromTrashButton = ({ images, color, clearSelectionCallback }: Props) => {
    const handleRestoreImage = () => {
        images?.forEach(image => {
            axios.patch(
                API_URL + '/images/' + image.id,
                {"deleted": false}
                )
        })
        if(clearSelectionCallback){
            clearSelectionCallback();
        }
    }

    return (
        <Tooltip title='Restore'>
            <IconButton onClick={handleRestoreImage}><IoArrowUndoCircle color={color} /></IconButton>
        </Tooltip>
    )
}

export default RestoreFromTrashButton