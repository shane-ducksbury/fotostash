import { ImageListItem } from '@mui/material'
import React from 'react'
import Image from '../interfaces/Image'

type Props = {
    image: Image;
    index: number;
    handleModalOpen: (image: Image, index: number) => void;
}

const AlbumImage = ({ image, index, handleModalOpen }: Props) => {
    return (
        <ImageListItem key={image.id}>
            <img 
                onClick={() => handleModalOpen(image, index)} 
                className='album-image' src={`${image.imageUrl}`}
                srcSet={`${image.imageUrl}`}
                alt='something'
                loading="lazy" />
        </ImageListItem>
    )
}

export default AlbumImage