import React, { useEffect, useState } from 'react'
import { ImageList, ImageListItem, ImageListItemBar, Modal } from '@mui/material';
import AlbumLightbox from './AlbumLightbox';

import Image from '../interfaces/Image'
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

type Props = {
    imageAlbum: Image[];
    refetch: () => void;
    albumName?: string;
}

const ImageAlbum = ({ imageAlbum, refetch, albumName }: Props) => {

    const [allPhotos, setAllPhotos] = useState<Image[]>(imageAlbum);
    const [allPhotoDates, setAllPhotoDates] = useState<number[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const useAlbumName = albumName ?? 'All Photos';


    const getImageDateTime = (dateTime: string) => {
        const fixedDate = dateTime.split(' ')[0].replace(/:/g,'-');
        const time = dateTime.split(' ')[1];
        const date = Date.parse(`${fixedDate} ${time}`);
        return date;
    }

    const refetchImages = () => {
        setModalOpen(false);
        refetch();
    }

    const handleModalOpen = (image: Image, index: number) => {
        setModalOpen(true);
        setSelectedImage(image);
        setSelectedImageIndex(index);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleImageChange = (direction: number) => {
        const image = allPhotos.at(selectedImageIndex + direction);
        if(!image) return
        if(image){
            setSelectedImage(image);
            setSelectedImageIndex(selectedImageIndex + direction);
        }
    }

    const sortPhotos = () => {
        allPhotos.sort((a: Image, b: Image) => {
            return getImageDateTime(b.dateTime) - getImageDateTime(a.dateTime);
        })
    }

    const getPhotoDates = () => {
        allPhotos.forEach((image: Image) => {

        })
    }

    sortPhotos();

    return (
        <div>
            <h1>{useAlbumName}</h1>
            <div className='album-wrapper'>
                <ImageList sx={{ height: '80vh' }} cols={4} rowHeight={200}>
                    {allPhotos.map((item: Image, index: number) => {
                        return(
                            <ImageListItem  key={item.id}>
                                <img onClick={() => handleModalOpen(item, index)} className='album-image' src={`${item.imageUrl}`}
                                    srcSet={`${item.imageUrl}`}
                                    alt='something'
                                    loading="lazy" />
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </div>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <>
                <AlbumLightbox 
                image={selectedImage} 
                handleImageChange={handleImageChange}
                handleForceParentRerender={refetchImages}
                />
                </>
            </Modal>
        </div>
    )
}

export default ImageAlbum