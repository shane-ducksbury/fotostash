import { IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { IoRemoveCircleOutline } from 'react-icons/io5'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

type Props = {
    albumId: string;
    imageId: string;
}

const RemoveFromAlbumButton = ({ albumId, imageId }: Props) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleRemoveImageFromAlbum = async () => {
        await axios.delete(`${API_URL}/albums/${albumId}/${imageId}`);
        queryClient.invalidateQueries(['albumImages', albumId]);
        navigate(`/albums/${albumId}`);
    }

    return (
        <Tooltip title='Remove From Album'>
            <IconButton onClick={handleRemoveImageFromAlbum}><IoRemoveCircleOutline color="#FFFFFF"/></IconButton>
        </Tooltip>
    )
}

export default RemoveFromAlbumButton