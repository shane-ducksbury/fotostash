import React, { useEffect, useState } from 'react'
import { ImageList, ImageListItem, Modal } from '@mui/material';
import AlbumLightbox from '../components/AlbumLightbox';

import Image from '../interfaces/Image'
import UserService from '../services/UserService';

type Props = {}

const AllPhotos = (props: Props) => {

    const [allPhotos, setAllPhotos] = useState<Image[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const [rerender, setRerender] = useState<boolean>(true);

    useEffect(() => {
        if(rerender){
            setModalOpen(false);
            getUserPhotos();
            setRerender(false);
        }
    }, [rerender])

    const getImageDateTime = (dateTime: string) => {
        const fixedDate = dateTime.split(' ')[0].replace(/:/g,'-');
        const time = dateTime.split(' ')[1];
        const date = Date.parse(`${fixedDate} ${time}`)
        return date;
    }

    const getUserPhotos = async () => {
        const userImages = await UserService.getUserImages();
        userImages.sort((a: Image, b: Image) => {
            return getImageDateTime(a.dateTime) - getImageDateTime(b.dateTime);
        })
        setAllPhotos(userImages);
    }

    const rerenderPage = () => {
        setRerender(true);
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

    return (
        <div>
            <h1>All Photos</h1>
            <div className='album-wrapper'>
                <ImageList sx={{ height: '80vh' }} cols={3} rowHeight={350}>
                    {allPhotos.map((item: Image, index: number) => {
                        return(<ImageListItem onClick={() => handleModalOpen(item, index)} key={item.id}>
                            <img src={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt='something'
                                loading="lazy" />
                        </ImageListItem>)
                    })}
                </ImageList>
            </div>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <>
                <AlbumLightbox 
                image={selectedImage} 
                handleImageChange={handleImageChange}
                handleForceParentRerender={rerenderPage}
                />
                </>
            </Modal>
        </div>
    )
}

export default AllPhotos