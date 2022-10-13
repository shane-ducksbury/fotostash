import React, { useEffect, useState } from 'react'
import { ImageList, ImageListItem, Modal } from '@mui/material';
import AlbumLightbox from '../components/AlbumLightbox';

import Image from '../interfaces/Image'
import AlbumPreviewCard from '../components/AlbumPreviewCard';
import UserService from '../services/UserService';

type Props = {}

const AllPhotos = (props: Props) => {

    const [allPhotos, setAllPhotos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image>({
        id: "null", name: "null", imageUrl: "null"
    });

    const [rerender, setRerender] = useState<boolean>(true);

    useEffect(() => {
        if(rerender){
            getUserPhotos();
            setRerender(false)
        }
    }, [rerender])

    const getUserPhotos = async () => {
        const userImages = await UserService.getUserImages()
        setAllPhotos(userImages)
    }

    const rerenderPage = () => {
        setRerender(true);
    }

    const handleModalOpen = (image: Image) => {
        setModalOpen(true);
        setSelectedImage(image)
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
        <div>
            <h1>All Photos</h1>
            
            <div className='album-wrapper'>
                <ImageList sx={{ height: '80vh' }} cols={3} rowHeight={350}>
                    {allPhotos.map((item: Image) => {
                        return(<ImageListItem onClick={() => handleModalOpen(item)}>
                            <img src={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt='something'
                                loading="lazy" />
                        </ImageListItem>)
                    })}
                </ImageList>
                {/* {allPhotos ? 
                allPhotos.map((item: Image) => { 
                    return(
                        <AlbumPreviewCard key={item.id} image={item} modalHandler={handleModalOpen} rerenderHandler={rerenderPage} />
                        ) 
                }) 
                : `<h1>No Data</h1>`} */}
            </div>

            <Modal open={modalOpen} onClose={handleModalClose} sx={{justifyContent: "center"}}>
                <div className="lightbox-wrapper">
                    <AlbumLightbox image={selectedImage} />
                </div>
            </Modal>
        </div>
    )
}

export default AllPhotos