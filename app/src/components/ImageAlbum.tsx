import React, { ReactNode, useEffect, useState } from 'react'
import { Button, IconButton, Modal, Tooltip } from '@mui/material';
import AlbumLightbox from './AlbumLightbox';

import Image from '../interfaces/Image'
import AlbumImageList from './AlbumImageList';
import AddToAlbum from './AddToAlbum';
import SendToTrashButton from './SendToTrashButton';
import { IoClose } from 'react-icons/io5';
import RestoreFromTrashButton from './RestoreFromTrashButton';
import { useQueries, useQueryClient } from 'react-query';

type Props = {
    imageAlbum: Image[];
    refetch: () => void;
    albumName?: string;
    albumAction?: ReactNode;
    albumQuery?: string;
}

const ImageAlbum = ({ imageAlbum, refetch, albumName, albumAction, albumQuery }: Props) => {
    // This component has become quite large and should be broken down at some point
    const [allPhotos, setAllPhotos] = useState<Image[]>(imageAlbum);
    const [allPhotoDates, setAllPhotoDates] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedImages, setSelectedImages] = useState<Image[]>([]);
    const [clearSelection, setClearSelection] = useState<boolean>(false);
    const useAlbumName = albumName ?? 'All Photos';

    const queryClient = useQueryClient();
    
    useEffect(() => {
        setAllPhotos(imageAlbum);
        sortPhotos();
        getPhotoDates();
    },[imageAlbum])

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
        queryClient.fetchQuery('allPhotos');
    }

    const handleModalOpen = (image: Image, index: number) => {
        setModalOpen(true);
        setSelectedImage(image);
        setSelectedImageIndex(index);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        queryClient.fetchQuery('allPhotos');
    }

    const addImageToSelection = (image: Image) => {
        const foundImage = selectedImages.find(i => i.id === image.id);
        if(foundImage) return;
        setSelectedImages([...selectedImages, image])
    }

    const removeImageFromSelection = (image: Image) => {
        setSelectedImages(selectedImages.filter(i => i.id !== image.id))
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
        if(albumName === 'Trash') return;
        if(allPhotoDates.length < 2) return
        const firstImage = allPhotos.at(0)?.dateTime
        const lastImage = allPhotos.at(-1)?.dateTime
        if(!firstImage || !lastImage) return
        return(
            <p>{getImageDateTime(lastImage).toDateString()} - {getImageDateTime(firstImage).toDateString() }</p>
        )
    }

    const updateClearSelection = () => {
        setSelectedImages([]);
        setClearSelection(true);
        queryClient.fetchQuery('allPhotos');
    }

    // This is required as I need to toggle and wait for the state to drill down into the children
    // before setting back to true. Seems like a code smell, will need to fix later.
    useEffect(() => {
        if(clearSelection){
            setClearSelection(false);
        }
    }, [clearSelection])

    const getImageSelectionActions = () => {
        return(
            <div className='image-selection-actions'>
                <div>
                    <Tooltip title='Clear Selection'>
                        <IconButton onClick={() => { updateClearSelection() }}><IoClose /></IconButton>
                    </Tooltip>
                    <h3>{selectedImages.length} selected</h3>
                </div>
                <div>
                    {!albumName ? 
                    <AddToAlbum images={selectedImages} color={'#344240'} clearSelectionCallback={updateClearSelection} />
                    : null}
                    {
                        albumName === 'Trash' ? 
                        <RestoreFromTrashButton images={selectedImages} color={'#344240'} clearSelectionCallback={updateClearSelection}  />
                        :
                        <SendToTrashButton images={selectedImages} color={'#344240'} clearSelectionCallback={updateClearSelection} />
                    }
                </div>
            </div>
        )
    }
    
    useEffect(() => {
        getPhotoDates();
        sortPhotos();
    },[])

    if(imageAlbum.length < 1){
        return(               
        <div className='no-content'>
            <img src="img/organize-photo.svg" alt="" />
            <h2>Looks like this album is empty. Add some photos from the All Photos page.</h2>
        </div>
    )
    }
    else {
        return (
            <div>
                <div className='image-album-header'>
                    {selectedImages.length > 0 ? getImageSelectionActions() :                
                    <div>
                        <h1>{useAlbumName}</h1>
                        {getPhotoDateSubtitle()}
                    </div>}
                    {albumAction && selectedImages.length < 1 ? albumAction : null}
                </div>
        
                <div className='album-wrapper'>
                    {allPhotoDates && !albumName ? 
                    allPhotoDates.map(date => {
                        return (
                            <div key={date}>
                            <h3>{date}</h3>
                            <AlbumImageList 
                                allPhotos={allPhotos}
                                date={date}
                                getImageDateTime={getImageDateTime}
                                handleModalOpen={handleModalOpen}
                                addImageToSelection={addImageToSelection}
                                removeImageFromSelection={removeImageFromSelection}
                                clearSelection={clearSelection}
                                />
                            </div>
                        )})
                    :                         
                    <AlbumImageList 
                        allPhotos={allPhotos}
                        getImageDateTime={getImageDateTime}
                        handleModalOpen={handleModalOpen}
                        addImageToSelection={addImageToSelection}
                        removeImageFromSelection={removeImageFromSelection}
                        clearSelection={clearSelection}
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


}

export default ImageAlbum