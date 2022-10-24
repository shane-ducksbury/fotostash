import { ImageList } from '@mui/material'
import React from 'react'
import Image from '../interfaces/Image'
import AlbumImage from './AlbumImage';

type Props = {
    allPhotos: Image[];
    numberOfCols: number;
    date?: string;
    getImageDateTime: (dateTime: string) => Date;
    handleModalOpen: (image: Image, index: number) => void;
}

const AlbumImageList = ({ allPhotos, numberOfCols, date, getImageDateTime, handleModalOpen }: Props) => {
    if(date){
        return(
        <ImageList cols={numberOfCols} rowHeight={200}>
            {allPhotos.map((item: Image, index: number) => {
                if(date){
                    if(getImageDateTime(item.dateTime).toDateString() === date){
                        return(
                            <AlbumImage key={item.id} image={item} index={index} handleModalOpen={handleModalOpen} />
                        )
                    }
                }
            })}
        </ImageList>
        )
    }

    return (
        <ImageList cols={numberOfCols} rowHeight={200}>
            {allPhotos.map((item: Image, index: number) => {
                return(
                    <AlbumImage key={item.id} image={item} index={index} handleModalOpen={handleModalOpen} />
                )
            })}
        </ImageList>
    )

}

export default AlbumImageList