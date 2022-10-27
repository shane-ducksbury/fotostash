import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import AlbumLightbox from './AlbumLightbox';

import Image from '../interfaces/Image'
import AlbumImageList from './AlbumImageList';

type Props = {
    imageAlbum: Image[];
    refetch: () => void;
    albumName?: string;
}

const ImageAlbum = ({ imageAlbum, refetch, albumName }: Props) => {
    // This component has become quite large and should be broken down at some point
    const [allPhotos, setAllPhotos] = useState<Image[]>(imageAlbum);
    const [allPhotoDates, setAllPhotoDates] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const useAlbumName = albumName ?? 'All Photos';

    const getImageDateTimeEpoch = (dateTime: string) => {
        const fixedDate = dateTime.split(' ')[0].replace(/:/g,'/');
        const time = dateTime.split(' ')[1];
        const date = Date.parse(`${fixedDate} ${time}`);
        return date;
    }

    const getImageDateTime = (dateTime: string) => {
        const fixedDate = dateTime.split(' ')[0].replace(/:/g,'/');
        const time = dateTime.split(' ')[1];
        const date = new Date(`${fixedDate} ${time}`);
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
            return getImageDateTimeEpoch(b.dateTime) - getImageDateTimeEpoch(a.dateTime);
        })
    }

    const getPhotoDates = () => {
        const imageDates: string[] = [];
        allPhotos.forEach((image: Image) => {
            const imageDate = getImageDateTime(image.dateTime).toDateString();
            if(!imageDates.includes(imageDate)){
                imageDates.push(imageDate);
            }
        })
        setAllPhotoDates(imageDates);
    }

    const getPhotoDateSubtitle = () => {
        if(!albumName) return;
        if(allPhotoDates.length < 2) return
        const firstImage = allPhotos.at(0)?.dateTime
        const lastImage = allPhotos.at(-1)?.dateTime
        if(!firstImage || !lastImage) return
        return(
            <p>{getImageDateTime(lastImage).toDateString()} - {getImageDateTime(firstImage).toDateString() }</p>
        )
    }
    
    useEffect(() => {
        getPhotoDates();
        sortPhotos();
    },[])


    return (
        <div>
            <h1>{useAlbumName}</h1>
            {getPhotoDateSubtitle()}

            <div className='album-wrapper'>
                {allPhotoDates && (!albumName) ? 
                allPhotoDates.map(date => {
                    return (
                        <div key={date}>
                        <h2>{date}</h2>
                        <AlbumImageList 
                            allPhotos={allPhotos}
                            date={date}
                            getImageDateTime={getImageDateTime}
                            handleModalOpen={handleModalOpen}
                            
                            />
                        </div>
                    )})
                :                         
                <AlbumImageList 
                    allPhotos={allPhotos}
                    getImageDateTime={getImageDateTime}
                    handleModalOpen={handleModalOpen}
                />}
            </div>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <>
                <AlbumLightbox 
                image={selectedImage} 
                handleImageChange={handleImageChange}
                handleForceParentRerender={refetchImages}
                handleCloseModal={handleModalClose}
                />
                </>
            </Modal>
        </div>
    )
}

export default ImageAlbum