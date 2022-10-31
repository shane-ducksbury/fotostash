import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Image from '../interfaces/Image'

type Props = {
    albumId: string;
}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const AlbumPreview = ({albumId}: Props) => {

    const getAlbumImages = async () => {
        const res = await axios.get(`${API_URL}/albums/${albumId}`);
        return res.data
    }

    const { data, status } = useQuery(`${albumId}-preview`, getAlbumImages, {refetchOnWindowFocus: true})

    const getPreviewImage = (images: Image[]) => {
        if(images.length < 1) return(
                <div className='album-preview-empty'>
                    <h3>Add Some Images to This Album</h3>
                </div>
            ) 
        if(images.length >= 1){
            return(<img src={`${data.images[0].imageUrl}`} alt="" className='album-preview-single' />)
        }
        // Will reimplement this when I have more time
        // if(images.length >= 4){
        //     return(
        //         <div className='album-preview-tile-wrapper'>
        //             <img src={`${data.images[0].imageUrl}`} alt="" className='album-preview-tiled' />
        //             <img src={`${data.images[1].imageUrl}`} alt="" className='album-preview-tiled' />
        //             <img src={`${data.images[2].imageUrl}`} alt="" className='album-preview-tiled' />
        //             <img src={`${data.images[3].imageUrl}`} alt="" className='album-preview-tiled' />
        //         </div>
        //     )
        // }
    }

    return (
        <div className='album-preview'>
        {status === 'loading' && <CircularProgress />}
        {status === 'success' && getPreviewImage(data.images)}
        </div>
    )
}

export default AlbumPreview