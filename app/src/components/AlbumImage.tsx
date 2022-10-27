import { Button, IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5';
import Image from '../interfaces/Image'

type Props = {
    image: Image;
    index: number;
    handleModalOpen: (image: Image, index: number) => void;
    addImageToSelection: (image: Image) => void;
    removeImageFromSelection: (image: Image) => void;
    clearSelection: boolean;
}

const AlbumImage = ({ image, index, handleModalOpen, addImageToSelection, removeImageFromSelection, clearSelection }: Props) => {
    const [selected, setSelected] = useState<boolean>();

    const updateSelected = (selectedImage: Image) => {
        if(selected){
            setSelected(false);
            removeImageFromSelection(selectedImage);
        }
        if(!selected) {
            setSelected(true);
            addImageToSelection(selectedImage);
        }
    }

    useEffect(() => {
        if(clearSelection){
            setSelected(false);
        }
    },[clearSelection])

    return (
        <ImageListItem key={image.id} className={selected ? 'album-image-selected' : ''}>
            <ImageListItemBar sx={[
            { '&:hover' : {
                opacity: 1,
                display: 'flex',
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' +
                  'rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
              }},
              {
                '&.album-image-selection-bar-selected' : {
                    opacity: 1,
                    background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' +
                  'rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)'
                }
              },
              
                {
                    opacity: 0
                }
              ,
            ]} 
              className={selected ? 'album-image-selection-bar-selected' : 'album-image-selection-bar'} position='top' actionIcon={
                <IconButton onClick={() => { updateSelected(image) }}>{selected ? <IoCheckmarkCircle color='#dce2e1' /> : <IoCheckmarkCircleOutline color='#dce2e1' />} </IconButton>
            }/>
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