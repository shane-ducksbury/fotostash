import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import AlbumLightbox from '../components/AlbumLightbox';

import Image from '../interfaces/Image'
import AlbumPreviewCard from '../components/AlbumPreviewCard';
import axios from 'axios';

type Props = {}

const API_ENDPOINT = "http://localhost:5050"

const AllPhotos = (props: Props) => {

    const [allPhotos, setAllPhotos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image>({
        id: "null", name: "null", imageUrl: "null"
    });

    const [rerender, setRerender] = useState<boolean>(true);

    useEffect(() => {
        if(rerender){
            axios.get(API_ENDPOINT + "/images")
            .then(response => setAllPhotos(response.data))
            setRerender(false)
        }
    }, [rerender])

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
                {allPhotos ? 
                allPhotos.map((item: Image) => { 
                    return(
                        <AlbumPreviewCard key={item.id} image={item} modalHandler={handleModalOpen} rerenderHandler={rerenderPage} />
                        ) 
                }) 
                : `<h1>No Data</h1>`}
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