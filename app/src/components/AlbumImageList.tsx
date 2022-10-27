import { ImageList } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from '../interfaces/Image'
import AlbumImage from './AlbumImage';

type Props = {
    allPhotos: Image[];
    date?: string;
    getImageDateTime: (dateTime: string) => Date;
    handleModalOpen: (image: Image, index: number) => void;
    addImageToSelection: (image: Image) => void;
    removeImageFromSelection: (image: Image) => void;
    clearSelection: boolean;
}

const AlbumImageList = ({ allPhotos, date, getImageDateTime, handleModalOpen, addImageToSelection, removeImageFromSelection, clearSelection }: Props) => {

    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    
    const [numberOfCols, setNumberOfCols] = useState<number>(4);
    const [previewHeight, setPreviewHeight] = useState<number>(200);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    
    const getNumberOfCols = () => {
        if(windowSize.innerWidth >= 800){
            const numOfCols =  Math.floor((windowSize.innerWidth - 250) / 280);
            return numOfCols ?? 1;
        }
        if(windowSize.innerWidth < 800 && windowSize.innerWidth > 500){
            return Math.floor(windowSize.innerWidth / 250);
        }
        return Math.floor(windowSize.innerWidth / 125);
    }

    const getPreviewHeight = () => {
        if(windowSize.innerWidth >= 800){
            return 200
        }
        return 120
    }

    useEffect(() => {
        setNumberOfCols(getNumberOfCols());
        setPreviewHeight(getPreviewHeight());
    },[windowSize.innerWidth])



    if(date){
        return(
        <ImageList cols={numberOfCols} rowHeight={previewHeight}>
            {allPhotos.map((item: Image, index: number) => {
                if(date){
                    if(getImageDateTime(item.dateTime).toDateString() === date){
                        return(
                            <AlbumImage 
                            key={item.id} 
                            image={item} 
                            index={index} 
                            handleModalOpen={handleModalOpen} 
                            addImageToSelection={addImageToSelection}
                            removeImageFromSelection={removeImageFromSelection}
                            clearSelection={clearSelection}
                            />
                        )
                    }
                }
            })}
        </ImageList>
        )
    }

    return (
        <ImageList cols={numberOfCols} rowHeight={previewHeight}>
            {allPhotos.map((item: Image, index: number) => {
                return(
                    <AlbumImage 
                        key={item.id} 
                        image={item} 
                        index={index} 
                        handleModalOpen={handleModalOpen} 
                        addImageToSelection={addImageToSelection}
                        removeImageFromSelection={removeImageFromSelection}
                        clearSelection={clearSelection}
                    />
                )
            })}
        </ImageList>
    )

}

export default AlbumImageList