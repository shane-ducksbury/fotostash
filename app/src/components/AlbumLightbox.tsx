import React from 'react'
import { Button } from '@mui/material'
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5'
import Image from "../interfaces/Image"
import LightboxButtons from './LightboxButtons'


type Props = {
    image: Image | null;
    handleImageChange: (direction: number) => void;
    handleForceParentRerender: () => void;
    handleCloseModal: () => void;
}

const AlbumLightbox = ({ image, handleImageChange, handleForceParentRerender, handleCloseModal }: Props) => {

    return(
        <>
        {image ?
        <LightboxButtons 
            image={image}
            handleForceParentRerender={handleForceParentRerender}
            handleCloseModal={handleCloseModal}
        />
        : null
        }
        <div className="lightbox-wrapper">
            <Button onClick={() => {handleImageChange(-1)}}><IoArrowBackCircle size={'2rem'} /></Button>
            <div className="lightbox-image-container">
                <img src={image ? image.imageUrl : ''} alt="" />
            </div>
            <Button onClick={() => {handleImageChange(1)}} ><IoArrowForwardCircle size={'2rem'} /></Button>
        </div>
        </>
    )

}

export default AlbumLightbox