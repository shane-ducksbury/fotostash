import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import AlbumLightbox from '../components/AlbumLightbox';

import Image from '../interfaces/Image'
import AlbumPreviewCard from '../components/AlbumPreviewCard';

type Props = {}

const AllPhotos = (props: Props) => {

    const [allPhotos, setAllPhotos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image>({
        id: "null", name: "null", imageUrl: "null"
    });

    useEffect(() => {
        fetch('http://localhost:5050/images')
        .then(res => res.json())
        .then(data => setAllPhotos(data)) 
    }, [])

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
                        <AlbumPreviewCard key={item.id} image={item} modalHandler={handleModalOpen} />
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